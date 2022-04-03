export const configuration = () => ({
  kubernetes: {
    configFile: process.env.KUBECONFIG,
    isInCluster: process.env.IS_IN_KUBERNETES_CLUSTER?.toLowerCase() === 'true',
  },
  financer: {
    rollout: {
      accessToken: {
        dev: process.env.FINANCER_ROLLOUT_ACCESS_TOKEN_DEV,
      },
    },
  },
});
