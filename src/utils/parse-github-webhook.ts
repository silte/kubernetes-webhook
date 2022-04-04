import crypto from 'crypto';

type WorkflowConclusion = 'success' | 'failure' | 'cancelled' | 'skipped';
type WorkflowStatus = 'completed' | 'in_progress' | 'queued';

type ParsedWebhook = {
  branchName?: string;
  workflowSource?: string;
  workflowName?: string;
  workflowStatus?: WorkflowStatus;
  workflowConclusion?: WorkflowConclusion;
};

export const isValidGithubWebhookBodyHash = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  hash: string,
  hashToken: string,
): boolean => {
  const stringBody = typeof body === 'string' ? body : JSON.stringify(body);

  const hashToCompare = crypto
    .createHmac('sha256', hashToken)
    .update(stringBody)
    .digest('hex');

  return hash === `sha256=${hashToCompare}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseGithubWebhook = (body: any): ParsedWebhook => {
  const { workflow_run: workflowInfo = {}, workflow = {} } = body;

  const branchName = workflowInfo.head_branch as string;
  const workflowSource = workflow.path as string;
  const workflowName = workflowInfo.name as string;
  const workflowStatus = workflowInfo.status as WorkflowStatus;
  const workflowConclusion = workflowInfo.conclusion as WorkflowConclusion;

  return {
    branchName,
    workflowSource,
    workflowName,
    workflowStatus,
    workflowConclusion,
  };
};
