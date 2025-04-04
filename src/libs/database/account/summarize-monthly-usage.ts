import { db } from '@libs/database/db';
import { getCreditEventMap } from '@libs/env';

export const summarizeMonthlyUsage = async (appId: string, month: string) => {
  const startDate = new Date(`${month}-01T00:00:00.000Z`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const events = await db.creditUsage.findMany({
    where: {
      appId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      type: true,
    },
  });

  const counts: Record<string, number> = {};
  for (const event of events) {
    counts[event.type] = (counts[event.type] || 0) + 1;
  }

  const creditMap = getCreditEventMap();

  const totalCredits = Object.entries(counts).reduce((sum, [type, count]) => {
    const multiplier = creditMap[type] || 0;
    return sum + count * multiplier;
  }, 0);

  // Save or update in MonthlyCreditUsage table
  await db.monthlyCreditUsage.upsert({
    where: {
      appId_month: {
        appId,
        month,
      },
    },
    update: {
      credits: BigInt(totalCredits),
    },
    create: {
      appId,
      month,
      credits: BigInt(totalCredits),
    },
  });

  return {
    appId,
    month,
    credits: totalCredits.toString(),
  };
};
