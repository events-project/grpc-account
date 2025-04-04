import { db } from '@libs/database/db';
import { UsageType } from '@prisma/client';

export const saveCreditUsage = async (
  id: string,
  appId: string,
  type: UsageType,
  credits: bigint
) => {

  return db.creditUsage.create({
    data: {
      id,
      appId,
      type,
      credits,
    },
  });
};
