import { createServer } from 'nice-grpc';

import { ExampleServiceDefinition } from '@grpc/service';
import { db } from '@libs/database';
import * as methods from './methods';
import { env } from '@libs/env';
import { errorHandlingMiddleware } from '@events-project/common';

const address = `${env('HOST')}:${env('PORT')}`;

async function startServer(): Promise<void> {
  try {
    const server = createServer().use(errorHandlingMiddleware);
    server.add(ExampleServiceDefinition, methods);

    // Connect to database
    await db.$connect();
    await server.listen(address);

    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        await server.shutdown();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error as Error);
    process.exit(1);
  }
}

startServer()
  .then(() => {
    console.log(`Server started on ${address}`);
  })
  .catch((error) => {
    console.error('Unhandled error:', error as Error);
    process.exit(1);
  });
