import { InternalError } from '@events-project/common';
import { db } from '@libs/database/db';
import { Account } from '@prisma/client';
import { hash } from 'encrypt-tools';

export const findAccountByKey = async (key: string): Promise<Account | null> => {
  try {
    const result = await db.secret.findFirst({
      where: {
        hash: hash(key, 'sha256'),
      },
      include: {
        account: true,
      },
    });
    if (!result) return null;
    return result.account;
  } catch (error) {
    throw new InternalError();
  }
};
