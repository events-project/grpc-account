import { InternalError, logger } from '@events-project/common';
import { db } from '@libs/database/db';
import { PeriodBillingParams } from '@libs/schemas';
import { PeriodCreditUsage } from '@prisma/client';

export const summarizePeriodUsage = async ({
  appId,
  target,
}: PeriodBillingParams): Promise<PeriodCreditUsage> => {
  try {
    const lastSummary = await db.periodCreditUsage.findFirst({
      where: { appId },
      orderBy: { end: 'desc' },
    });

    let start = lastSummary?.end;

    if (!start) {
      const firstUsage = await db.creditUsage.findFirst({
        where: { appId },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      });

      start = firstUsage?.createdAt;

      if (!start) {
        logger.warn(`No usage data found for appId ${appId}`);
        throw new InternalError('NO_USAGE_DATA_FOUND');
      }
    }

    const total = await db.creditUsage.aggregate({
      where: {
        appId,
        createdAt: {
          gte: start,
          lt: target,
        },
      },
      _sum: {
        credits: true,
      },
    });

    const credits = total._sum.credits ?? BigInt(0);

    return await db.periodCreditUsage.create({
      data: {
        appId,
        start,
        end: target,
        credits,
      },
    });
  } catch (error) {
    if (error instanceof InternalError) {
      throw error;
    }

    logger.error('Failed to summarize period usage:', error);
    throw new InternalError('SUMMARIZE_PERIOD_USAGE_ERROR');
  }
};
