import { RevealApiKeyRequest, RevealApiKeyResponse } from '@grpc/service';
import { revealSecretByIds } from '@libs/database/account';

export const revealApiKey = async (request: RevealApiKeyRequest): Promise<RevealApiKeyResponse> => {
  const { accountId, secretId } = request;
  if (!accountId) {
    throw new Error('Account ID is required');
  }
  if (!secretId) {
    throw new Error('Secret ID is required');
  }

  const { apiKey } = await revealSecretByIds(accountId, secretId);
  return { apiKey };
};
