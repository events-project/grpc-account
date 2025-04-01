import { createAccountClient } from '../client';

// Set the environment variable GRPC_ACCOUNT_URL to your service URL
process.env.GRPC_ACCOUNT_URL = 'localhost:50053';

// Create the client
const client = createAccountClient();

// Use the client
async function example() {
  const account = await client.createAccount({ id: 'user-123' });
  console.log(account);
}

example().catch(console.error);
