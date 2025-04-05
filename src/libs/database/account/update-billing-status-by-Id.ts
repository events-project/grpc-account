import { db } from '@libs/database/db';
import { PaymentStatus } from '@prisma/client';

export const updateBillingHandler = async (
  id: string,
  paymentId: string,
  paymentStatus: PaymentStatus
) => {
  return await db.periodCreditUsage.update({
    where: { id },
    data: {
      paymentId,
      paymentStatus,
    },
  });
};
