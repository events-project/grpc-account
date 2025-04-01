# Account gRPC Client

A simple gRPC client for the account service using nice-grpc.

## Installation

```bash
npm install @events-project/grpc-account
```

## Usage

```typescript
import { createAccountClient } from '@events-project/grpc-account';

// The client will automatically use the GRPC_ACCOUNT_URL environment variable
const client = createAccountClient();

// Example: Create an account
async function createAccount() {
  const response = await client.createAccount({
    id: 'user-123'
  });
  
  console.log(response); // { id: 'user-123', credits: 0 }
}

// Example: Validate API key
async function validateKey() {
  const response = await client.validateApiKey({
    key: 'api-key-123'
  });
  
  console.log(response); // { id: 'user-123', credits: 100 }
}
```

## Environment Variables

- `GRPC_ACCOUNT_URL`: The URL of the account gRPC service (e.g., `localhost:50051`)
