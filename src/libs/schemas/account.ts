import z from 'zod';

export const AccountSchema = z.object({
  id: z.string().min(1, 'App ID is required'),
});
export type AccountParams = z.infer<typeof AccountSchema>;
