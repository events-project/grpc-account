import { RevealApiKeyRequest, RevealApiKeyResponse } from '@grpc/service';
import { revealSecretByIds } from '@libs/database/account';

export const revealApiKey = async (request: RevealApiKeyRequest): Promise<RevealApiKeyResponse> => {
  const { accountId, secretId } = request;
  const { apiKey } = await revealSecretByIds(accountId, secretId);
  return { apiKey };
};
