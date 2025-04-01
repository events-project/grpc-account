import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { AccountServiceClient } from './service';
import * as path from 'path';
import * as fs from 'fs';

export * from './service';

// Get service URL from environment variable
const getServiceUrl = (): string => {
  const envVarName = 'GRPC_ACCOUNT_URL';
  const url = process.env[envVarName];
  if (!url) {
    throw new Error(`Environment variable ${envVarName} is not set`);
  }
  return url;
};

// Create and export the client
export const createAccountClient = (): AccountServiceClient => {
  // Look for the proto file in different locations
  let protoPath = '';
  const possiblePaths = [
    path.resolve(__dirname, '../service.proto'),
    path.resolve(__dirname, '../../service.proto'),
    path.resolve(process.cwd(), 'service.proto')
  ];
  
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      protoPath = p;
      break;
    }
  }
  
  if (!protoPath) {
    throw new Error('service.proto file not found');
  }

  // Load the proto file
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
  
  const proto = grpc.loadPackageDefinition(packageDefinition) as any;
  const AccountService = proto.account.AccountService;
  const client = new AccountService(getServiceUrl(), grpc.credentials.createInsecure());
  
  // Create a typed wrapper around the raw gRPC client
  return {
    createAccount: (request) => {
      return new Promise((resolve, reject) => {
        client.createAccount(request, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        });
      });
    },
    validateApiKey: (request) => {
      return new Promise((resolve, reject) => {
        client.validateApiKey(request, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        });
      });
    }
  };
};
