import { CreateAccountRequest, CreateAccountResponse } from '@grpc/service';
import { createNewAccount } from '@libs/database/account';

export const createAccount = async (
  request: CreateAccountRequest
): Promise<CreateAccountResponse> => {
  const result = await createNewAccount(request);
  return {
    id: result.id,
  };
};
