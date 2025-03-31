import { Example } from '@prisma/client';
import { CreateExampleRequest } from '@grpc/service';
import { db } from '../db';
import { InternalError } from '@events-project/common';

export const createNewExample = async (params: CreateExampleRequest): Promise<Example> => {
  try {
    const result = await db.example.create({
      data: {
        name: params.name,
      },
    });
    return result;
  } catch (error) {
    throw new InternalError();
  }
};
