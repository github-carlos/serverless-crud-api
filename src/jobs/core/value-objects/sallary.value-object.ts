import { z } from 'zod';

export const SallarySchema = z.object({
  value: z.number().gt(0, "Sallary should be greater than 0"),
  currency: z.string().default('USD')
})

export type Sallary = z.infer<typeof SallarySchema>;
