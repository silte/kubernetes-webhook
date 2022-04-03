export const configuration = () => ({
  financer: {
    rollout: {
      accessToken: {
        dev: process.env.FINANCER_ROLLOUT_ACCESS_TOKEN_DEV,
      },
    },
  },
});
