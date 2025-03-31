import { FindExampleRequest, ExampleResponse } from '@grpc/service';
import { findExampleById } from '@libs/database/example';

export const findExample = async (request: FindExampleRequest): Promise<ExampleResponse> => {
  const result = await findExampleById(request.id);
  return result;
};
