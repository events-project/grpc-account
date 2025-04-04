import { db } from '@libs/database/db';
import { UsageType } from '@prisma/client';

export const saveCreditUsage = async (
  id: string,
  appId: string,
  type: UsageType,
  credits: bigint
) => {
  const account = await db.account.findUnique({
    where: { id: appId },
  });

  if (!account) {
    throw new Error(`Account with ID ${appId} does not exist`);
  }

  return db.creditUsage.create({
    data: {
      id,
      appId,
      type,
      credits,
    },
  });
};
