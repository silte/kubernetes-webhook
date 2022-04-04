import { exec } from 'child_process';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KubernetesService {
  private readonly logger = new Logger(KubernetesService.name);

  async rolloutDeployment(namespace: string, deploymentName: string) {
    return new Promise((resolve, reject) => {
      const failedReponse = (error: string) => {
        return this.logger.error(
          `Deployment ${deploymentName} failed: ${error}`,
        );
        reject({
          status: 'failed',
          message: 'Deployment failed',
          error,
        });
      };

      const successReponse = (info: string) => {
        this.logger.log(`Deployment ${deploymentName} rolled out: ${info}`);
        resolve({
          status: 'success',
          message: 'Deployment succeeded',
          info,
        });
      };

      exec(
        `kubectl -n ${namespace} rollout restart deployment ${deploymentName}`,
        (err, stdout, stderr) => {
          if (err) {
            failedReponse(err.message);
          } else if (stderr) {
            failedReponse(stderr);
          }

          successReponse(stdout);
        },
      );
    });
  }
}
