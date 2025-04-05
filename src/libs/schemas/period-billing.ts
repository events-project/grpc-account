import z from 'zod';

export const PeriodBillingSchema = z.object({
  appId: z.string().min(1, 'App ID is required'),
  start: z
    .string()
    .datetime({ message: 'Start must be a valid ISO timestamp' })
    .transform((value) => new Date(value)),
  end: z
    .string()
    .datetime({ message: 'End must be a valid ISO timestamp' })
    .transform((value) => new Date(value)),
});
export type PeriodBillingParams = z.infer<typeof PeriodBillingSchema>;
