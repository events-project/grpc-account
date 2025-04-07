import { GetAccountStripeRequest, GetAccountStripeResponse } from '@grpc/service';
import { findAccountById } from '@libs/database/account';
import { NotFoundError } from '@events-project/common';

export const getAccountStripe = async (
  request: GetAccountStripeRequest
): Promise<GetAccountStripeResponse> => {
  const record = await findAccountById(request);
  if (!record) throw new NotFoundError('ACCOUNT_NOT_FOUND');
  return {
    id: record.id,
    stripeId: record.stripeId,
  };
};
