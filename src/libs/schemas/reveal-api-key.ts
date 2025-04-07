import z from 'zod';

export const RevealApiKeySchema = z.object({
  id: z.string().min(1, 'Account ID is required'),
  secretId: z.string().min(1, 'Secret ID is required'),
});
export type RevealApiKeyParams = z.infer<typeof RevealApiKeySchema>;
