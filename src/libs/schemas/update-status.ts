import { z } from 'zod';
import { PaymentStatus } from '@prisma/client';

export const UpdateBillingSchema = z.object({
  id: z.string().uuid(),
  paymentId: z.string().min(1),
  paymentStatus: z.nativeEnum(PaymentStatus),
});

export type UpdateBillingParams = z.infer<typeof UpdateBillingSchema>;
