import {
  SummarizePeriodUsageRequest,
  SummarizePeriodUsageResponse,
} from '@grpc/service';
import { summarizePeriodUsage } from '@libs/database/account';
import { z } from 'zod';

const periodBillingSchema = z.object({
  appId: z.string().min(1, 'App ID is required'),
  start: z.string().datetime({ message: 'Start must be a valid ISO timestamp' }),
  end: z.string().datetime({ message: 'End must be a valid ISO timestamp' }),
});

export const summarizeBillingForPeriod = async (
  request: SummarizePeriodUsageRequest
): Promise<SummarizePeriodUsageResponse> => {
  const { appId, start, end } = periodBillingSchema.parse(request);

  const { credits } = await summarizePeriodUsage(appId, new Date(start), new Date(end));

  return {
    appId,
    start,
    end,
    credits,
  };
};
