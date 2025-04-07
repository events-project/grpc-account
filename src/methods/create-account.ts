import { CreateAccountRequest, Account } from '@grpc/service';
import { createNewAccount } from '@libs/database/account';
import { CreateAccountSchema } from '@libs/schemas';
import { stripe } from '@libs/stripe';

export const createAccount = async (request: CreateAccountRequest): Promise<Account> => {
  const params = CreateAccountSchema.parse(request);

  const customer = await stripe.customers.create();
  const result = await createNewAccount({ id: params.id, stripeId: customer.id });

  return result;
};
