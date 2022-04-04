import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  parseGithubWebhook,
  isValidGithubWebhookBodyHash,
} from '../../utils/parse-github-webhook';
import { KubernetesService } from '../kubernetes/kubernetes.service';

@Injectable()
export class FinancerService {
  constructor(
    private configService: ConfigService,
    private kubernetesService: KubernetesService,
  ) {}

  async handleRolloutDevDeployment(authorizationToken: string) {
    const accessToken = this.configService.get<string>(
      'financer.accessToken.rollout.dev',
    );

    if (accessToken !== authorizationToken) {
      throw new UnauthorizedException('Incorrect authorization header');
    }

    return this.rolloutDevDeployment();
  }

  async handleWebhook(contentHash: string, body: any) {
    const targetWorkflowSource = '.github/workflows/publish-docker.yaml';
    const accessToken = this.configService.get<string>(
      'financer.accessToken.webhook',
    );

    if (!isValidGithubWebhookBodyHash(body, contentHash, accessToken)) {
      throw new UnauthorizedException('Invalid content hash.');
    }

    const {
      branchName,
      workflowSource,
      workflowName,
      workflowStatus,
      workflowConclusion,
    } = parseGithubWebhook(body);

    if (
      !branchName ||
      !workflowSource ||
      !workflowName ||
      !workflowStatus ||
      !workflowConclusion
    ) {
      throw new BadRequestException('Required fields are missing.');
    }

    if (workflowSource !== targetWorkflowSource) {
      return {
        status: 'skipped',
        message: `Workflow source is not ${targetWorkflowSource}`,
      };
    }

    if (workflowStatus !== 'completed' || workflowConclusion !== 'success') {
      return {
        status: 'failure',
        message: `Workflow ${workflowName} failed. Deployment will not be rolled out.`,
      };
    }

    if (branchName === 'production') {
      return {
        status: 'success',
        message: `@TODO - Deployment should be rolled out to production.`,
      };
    } else {
      return this.rolloutDevDeployment();
    }
  }

  private async rolloutDevDeployment() {
    return this.kubernetesService.rolloutDeployment(
      'financer',
      'dev-webapp-deployment',
    );
  }
}
