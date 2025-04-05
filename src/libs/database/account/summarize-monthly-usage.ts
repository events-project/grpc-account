import { InternalError, logger } from '@events-project/common';
import { db } from '@libs/database/db';
import { PeriodBillingParams } from '@libs/schemas';
import { PeriodCreditUsage } from '@prisma/client';

export const summarizePeriodUsage = async ({
  appId,
  start,
  end,
}: PeriodBillingParams): Promise<PeriodCreditUsage> => {
  try {
    const total = await db.creditUsage.aggregate({
      where: {
        appId,
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      _sum: {
        credits: true,
      },
    });

    return await db.periodCreditUsage.create({
      data: {
        appId,
        start,
        end,
        credits: total._sum.credits ?? 0,
      },
    });
  } catch (error) {
    logger.error('Failed to summarize period usage:', error);
    throw new InternalError('SUMMARIZE_PERIOD_USAGE_ERROR');
  }
};
