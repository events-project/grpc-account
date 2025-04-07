import { generateTypeId } from '@events-project/common';
import { CreateAccountRequest, Account } from '@grpc/service';
import { createNewAccount } from '@libs/database/account';
import { CreateAccountSchema } from '@libs/schemas';

export const createAccount = async (request: CreateAccountRequest): Promise<Account> => {
  const params = CreateAccountSchema.parse(request);

  // TODO: Get From stripe
  const stripeId = generateTypeId('stripe');
  const result = await createNewAccount({ id: params.id, stripeId });

  return result;
};
