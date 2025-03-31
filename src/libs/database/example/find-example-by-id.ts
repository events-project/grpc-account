import { Example } from '@prisma/client';
import { db } from '../db';
import { NotFoundError } from '@events-project/common';

export const findExampleById = async (id: string): Promise<Example> => {
  const result = await db.example.findUnique({
    where: { id },
  });
  if (!result) throw new NotFoundError();
  return result;
};
