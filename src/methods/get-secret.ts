import { GetSecretRequest, GetSecretResponse } from '@grpc/service';
import { getSecretById } from '@libs/database/account';
import { SecretSchema } from '@libs/schemas';

export const getSecret = async (request: GetSecretRequest): Promise<GetSecretResponse> => {
  const { appId } = SecretSchema.parse(request);

  const result = await getSecretById({ appId });
  return {
    appId: appId,
    secretId: result.id,
  };
};
