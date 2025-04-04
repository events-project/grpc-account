import { RevealApiKeyRequest, RevealApiKeyResponse } from '@grpc/service';
import { revealSecretByIds } from '@libs/database/account';
import { z } from 'zod';

// Define the schema using zod
const RevealApiKeySchema = z.object({
  accountId: z.string().min(1, 'Account ID is required'),
  secretId: z.string().min(1, 'Secret ID is required'),
});

export const revealApiKey = async (request: RevealApiKeyRequest): Promise<RevealApiKeyResponse> => {
  const { accountId, secretId } = RevealApiKeySchema.parse(request);

  const { apiKey } = await revealSecretByIds(accountId, secretId);
  return { apiKey };
};


