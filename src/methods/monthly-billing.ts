import { SummarizeMonthlyUsageRequest, SummarizeMonthlyUsageResponse } from '@grpc/service';
import { summarizeMonthlyUsage } from '@libs/database/account';

export const monthlyBilling = async (
  request: SummarizeMonthlyUsageRequest
): Promise<SummarizeMonthlyUsageResponse> => {
  const { appId, month } = request;
  if (!appId) {
    throw new Error('App ID is required');
  }
  if (!month) {
    throw new Error('Month is required');
  }
  const { credits } = await summarizeMonthlyUsage(appId, month);
  return { appId, month, credits };
};
