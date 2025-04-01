// Generated service interfaces for account service

// Message interfaces based on your proto file
export interface CreateAccountRequest {
  id: string;
}

export interface Account {
  id: string;
  credits: number;
}

export interface ValidateApiKeyRequest {
  key: string;
}

// Simple type definitions for the client methods
export interface AccountServiceClient {
  createAccount(request: CreateAccountRequest): Promise<Account>;
  validateApiKey(request: ValidateApiKeyRequest): Promise<Account>;
}
