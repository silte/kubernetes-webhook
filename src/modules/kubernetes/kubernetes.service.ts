import * as k8s from '@kubernetes/client-node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KubernetesService {
  private readonly kc: k8s.KubeConfig;

  constructor() {
    this.kc = new k8s.KubeConfig();
    if (process.env.KUBECONFIG) {
      this.kc.loadFromFile(process.env.KUBECONFIG);
    } else {
      this.kc.loadFromDefault();
    }
  }

  async rolloutDeployment(namespace: string, deploymentName: string) {
    const getPatch = (replicas) => [
      {
        op: 'replace',
        path: '/spec/replicas',
        value: replicas,
      },
    ];

    const k8sApi = this.kc.makeApiClient(k8s.AppsV1Api);
    const { body } = await k8sApi.readNamespacedDeploymentStatus(
      deploymentName,
      namespace,
    );

    await k8sApi.patchNamespacedDeploymentScale(
      deploymentName,
      namespace,
      getPatch(0),
      undefined,
      undefined,
      undefined,
      undefined,
      { headers: { 'content-type': 'application/json-patch+json' } },
    );

    await k8sApi.patchNamespacedDeploymentScale(
      deploymentName,
      namespace,
      getPatch(1),
      undefined,
      undefined,
      undefined,
      undefined,
      { headers: { 'content-type': 'application/json-patch+json' } },
    );

    return {
      message: 'Deployment rolled out',
    };
  }
}
