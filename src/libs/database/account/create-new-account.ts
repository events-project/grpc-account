import { db } from '@libs/database/db';
import { env } from '@libs/env';
import { generateTypeId, InternalError, logger } from '@events-project/common';
import { encrypt, hash, id } from 'encrypt-tools';
import { Account } from '@prisma/client';

export const createNewAccount = async (params: { id: string }): Promise<Account> => {
  try {
    const apiKey = id('sk', 42);
    const { iv, ciphertext } = encrypt({
      plaintext: apiKey,
      secretKey: env('SECRET_ENCRYPT_KEY'),
    });

    const result = await db.account.create({
      data: {
        id: params.id,
        secret: {
          create: [
            {
              id: generateTypeId('secret'),
              type: 'SECRET_KEY',
              secret: `${iv}:${ciphertext}`,
              hash: hash(apiKey, 'sha256'),
              isActive: true,
            },
          ],
        },
      },
    });

    return result;
  } catch (error) {
    logger.error('Failed to create new account:', error);
    throw new InternalError('CREATE_ACCOUNT_ERROR');
  }
};
