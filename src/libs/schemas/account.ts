import z from 'zod';

export const CreateAccountSchema = z.object({
  id: z.string().min(1, 'App ID is required'),
});
export type CreateAccountParams = z.infer<typeof CreateAccountSchema>;
