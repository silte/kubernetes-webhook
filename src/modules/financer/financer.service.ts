import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KubernetesService } from '../kubernetes/kubernetes.service';

@Injectable()
export class FinancerService {
  constructor(
    private configService: ConfigService,
    private kubernetesService: KubernetesService,
  ) {}

  async handleRolloutDevDeployment(authorizationToken: string) {
    const accessToken = this.configService.get<string>(
      'financer.rollout.accessToken.dev',
    );

    if (accessToken !== authorizationToken) {
      throw new UnauthorizedException('Incorrect authorization header');
    }

    return this.rolloutDevDeployment();
  }

  private rolloutDevDeployment() {
    return this.kubernetesService.rolloutDeployment(
      'financer',
      'dev-webapp-deployment',
    );
  }
}
