import { UpdateBillingRequest, UpdateBillingResponse } from '@grpc/service';
import { updateBillingHandler } from '@libs/database/account/update-billing-status-by-Id';
import { UpdateBillingSchema } from '@libs/schemas';

export const updateBillingStatus = async (
  request: UpdateBillingRequest
): Promise<UpdateBillingResponse> => {
  const { id, paymentId, paymentStatus } = UpdateBillingSchema.parse(request);

  const record = await updateBillingHandler(id, paymentId, paymentStatus);

  return {
    id: record.id,
    appId: record.appId,
    start: record.start.toISOString(),
    end: record.end.toISOString(),
    credits: record.credits.toString(),
    paymentId: record.paymentId ?? '',
    paymentStatus: record.paymentStatus,
    updatedAt: record.updatedAt.toISOString(),
  };
};
