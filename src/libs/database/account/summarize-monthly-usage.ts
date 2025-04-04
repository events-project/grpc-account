import { db } from '@libs/database/db';

export const summarizePeriodUsage = async (
  appId: string,
  start: Date,
  end: Date
) => {
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

  const result = await db.periodCreditUsage.upsert({
    where: {
      appId_start_end: {
        appId,
        start,
        end,
      },
    },
    update: {
      credits,
      updatedAt: new Date(),
    },
    create: {
      appId,
      start,
      end,
      credits,
    },
  });

  return {
    appId,
    start: result.start.toISOString(),
    end: result.end.toISOString(),
    credits: result.credits.toString(),
    paymentStatus: result.paymentStatus,
  };
};
