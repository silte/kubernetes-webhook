import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KubernetesService } from '../kubernetes/kubernetes.service';

@Injectable()
export class FinancerService {
  constructor(
    private configService: ConfigService,
    private kubernetesService: KubernetesService,
  ) {}

  async rolloutDevDeployment(
    namespace: string,
    deploymentName: string,
    authorizationToken: string,
  ) {
    const accessToken = this.configService.get<string>(
      'financer.rollout.accessToken.dev',
    );

    if (accessToken !== authorizationToken) {
      throw new UnauthorizedException('Incorrect authorization header');
    }

    return this.kubernetesService.rolloutDeployment(namespace, deploymentName);
  }
}
