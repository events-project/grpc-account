import { z } from 'zod';
import { getCreditEventMap } from '@libs/env';
import { UsageType } from '@prisma/client';
import { saveCreditUsage } from '@libs/database/account/save-credit-usage';

const usageTypeSchema = z.nativeEnum(UsageType);
const eventSchema = z.object({
  id: z.string().uuid(),
  appId: z.string().min(1),
  type: usageTypeSchema,
});

export const handleEvent = async (event: any) => {
  const validated = eventSchema.parse({
    id: event.id,
    appId: event.appId,
    type: event.type.toUpperCase(),
  });

  const creditMap = getCreditEventMap();
  const creditValue = creditMap[validated.type] || 0;

  await saveCreditUsage(
    validated.id,
    validated.appId,
    validated.type,
    BigInt(creditValue)
  );
};
