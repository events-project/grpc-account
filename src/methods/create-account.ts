import { CreateAccountRequest, Account } from '@grpc/service';
import { createNewAccount } from '@libs/database/account';

export const createAccount = async (request: CreateAccountRequest): Promise<Account> => {
  const result = await createNewAccount(request);
  return result;
};
