export const configuration = () => ({
  kubernetes: {
    configFile: process.env.KUBECONFIG,
    isInCluster: process.env.IS_IN_KUBERNETES_CLUSTER?.toLowerCase() === 'true',
  },
  financer: {
    accessToken: {
      webhook: process.env.FINANCER_ACCESS_TOKEN_WEBHOOK,
      rollout: {
        dev: process.env.FINANCER_ACCESS_TOKEN_ROLLOUT_DEV,
        prod: process.env.FINANCER_ACCESS_TOKEN_ROLLOUT_PROD,
      },
    },
  },
  workoutTracker: {
    accessToken: {
      webhook: process.env.WORKOUT_TRACKER_ACCESS_TOKEN_WEBHOOK,
      rollout: {
        dev: process.env.WORKOUT_TRACKER_ACCESS_TOKEN_ROLLOUT_DEV,
        prod: process.env.WORKOUT_TRACKER_ACCESS_TOKEN_ROLLOUT_PROD,
      },
    },
  },
});
