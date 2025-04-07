import { db } from '@libs/database/db';
import { InternalError, logger } from '@events-project/common';
import { Account } from '@prisma/client';

export const findAccountById = async (params: { id: string }): Promise<Account | null> => {
  try {
    return await db.account.findFirst({
      where: {
        id: params.id,
      },
    });
  } catch (error) {
    logger.error('Failed to find account by ID:', error);
    throw new InternalError('FIND_ACCOUNT_ERROR');
  }
};
