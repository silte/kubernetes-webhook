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

  async handleRolloutProdDeployment(authorizationToken: string) {
    const accessToken = this.configService.get<string>(
      'financer.accessToken.rollout.prod',
    );

    if (!accessToken || authorizationToken !== accessToken) {
      throw new UnauthorizedException('Incorrect authorization header');
    }

    return this.rolloutProdDeployment();
  }

  async handleRolloutDevDeployment(authorizationToken: string) {
    const accessToken = this.configService.get<string>(
      'financer.accessToken.rollout.dev',
    );

    if (!accessToken || accessToken !== authorizationToken) {
      throw new UnauthorizedException('Incorrect authorization header');
    }

    return this.rolloutDevDeployment();
  }

  async handleWebhook(contentHash: string, body: any) {
    const devWorkflowSource = '.github/workflows/build-docker.yml';
    const prodWorkflowSource = '.github/workflows/push-production.yml';
    const accessToken = this.configService.get<string>(
      'financer.accessToken.webhook',
    );

    if (
      !accessToken ||
      !isValidGithubWebhookBodyHash(body, contentHash, accessToken)
    ) {
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

    if (workflowStatus !== 'completed' || workflowConclusion !== 'success') {
      return {
        status: 'failure',
        message: `Workflow ${workflowName} failed. Deployment will not be rolled out.`,
      };
    }

    if (branchName === 'main' && workflowSource === prodWorkflowSource) {
      return this.rolloutProdDeployment();
    } else if (
      branchName !== 'main' &&
      workflowSource === devWorkflowSource
    ) {
      return this.rolloutDevDeployment();
    }

    return {
      status: 'skipped',
      message: `Workflow wasn't relevant for any deployment condition`,
    };
  }

  private async rolloutProdDeployment() {
    return this.kubernetesService.rolloutDeployment(
      'financer',
      'webapp-deployment',
    );
  }

  private async rolloutDevDeployment() {
    return this.kubernetesService.rolloutDeployment(
      'financer',
      'dev-webapp-deployment',
    );
  }
}
