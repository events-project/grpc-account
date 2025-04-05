import { db } from '@libs/database/db';
import { decrypt } from 'encrypt-tools';
import { env } from '@libs/env';
import { NotFoundError } from '@events-project/common';
import { RevealApiKeyParams } from '@libs/schemas';

export const revealSecretByIds = async ({
  accountId,
  secretId,
}: RevealApiKeyParams): Promise<{ apiKey: string }> => {
  const secretRecord = await db.secret.findFirst({
    where: {
      id: secretId,
      accountId: accountId,
      isActive: true,
    },
  });

  if (!secretRecord) throw new NotFoundError('SECRET_NOT_FOUND');

  const [iv, ciphertext] = secretRecord.secret.split(':');
  const apiKey = decrypt({
    secretKey: env('SECRET_ENCRYPT_KEY'),
    iv,
    ciphertext,
  });

  return { apiKey };
};
