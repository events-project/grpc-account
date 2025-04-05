import { SummarizePeriodUsageRequest, SummarizePeriodUsageResponse } from '@grpc/service';
import { summarizePeriodUsage } from '@libs/database/account';
import { PeriodBillingSchema } from '@libs/schemas';

export const monthlyBilling = async (
  request: SummarizePeriodUsageRequest
): Promise<SummarizePeriodUsageResponse> => {
  const { appId, start, end } = PeriodBillingSchema.parse(request);
  const { credits } = await summarizePeriodUsage({
    appId,
    start,
    end,
  });

  return {
    appId,
    start: start.toISOString(),
    end: end.toISOString(),
    credits: credits.toString(),
  };
};
