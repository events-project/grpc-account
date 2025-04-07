import { CreateAccountRequest, Account } from '@grpc/service';
import { createNewAccount } from '@libs/database/account';
import { AccountSchema } from '@libs/schemas';

export const createAccount = async (request: CreateAccountRequest): Promise<Account> => {
  const { id } = AccountSchema.parse(request);
  const stripeId = ''; //TODO
  const result = await createNewAccount(id, stripeId);
  return {
    id: result.id,
    createdAt: result.createdAt.toString(),
  };
};
