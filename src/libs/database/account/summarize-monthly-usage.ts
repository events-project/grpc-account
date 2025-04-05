import { InternalError, logger } from '@events-project/common';
import { db } from '@libs/database/db';
import { PeriodBillingParams } from '@libs/schemas';
import { PeriodCreditUsage } from '@prisma/client';

export const summarizePeriodUsage = async ({
  appId,
  target,
}: PeriodBillingParams): Promise<PeriodCreditUsage> => {
  try {
    const targetDate = new Date(target);

    const lastSummary = await db.periodCreditUsage.findFirst({
      where: { appId },
      orderBy: { end: 'desc' },
    });

    const start =
      lastSummary?.end ??
      (
        await db.creditUsage.findFirst({
          where: { appId },
          orderBy: { createdAt: 'asc' },
          select: { createdAt: true },
        })
      )?.createdAt;

    if (!start) {
      logger.warn(`No usage data found for appId ${appId}`);
      throw new InternalError('NO_USAGE_DATA_FOUND');
    }

    const end = targetDate;

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

    const credits = total._sum.credits ?? BigInt(0);

    return await db.periodCreditUsage.create({
      data: {
        appId,
        start,
        end,
        credits,
      },
    });
  } catch (error) {
    logger.error('Failed to summarize period usage:', error);
    throw new InternalError('SUMMARIZE_PERIOD_USAGE_ERROR');
  }
};
