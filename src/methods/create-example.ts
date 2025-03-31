import { CreateExampleRequest, ExampleResponse } from '@grpc/service';
import { createNewExample } from '@libs/database/example';

export const createExample = async (request: CreateExampleRequest): Promise<ExampleResponse> => {
  const result = await createNewExample(request);
  return result;
};
