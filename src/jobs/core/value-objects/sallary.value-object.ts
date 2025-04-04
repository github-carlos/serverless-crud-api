import { z } from 'zod'

export const SallarySchema = z
  .object({
    value: z.number().gt(0, 'Sallary should be greater than 0'),
    currency: z.string().default('USD'),
  })
  .strict()

export type SallaryDTO = z.infer<typeof SallarySchema>

export type Sallary = z.infer<typeof SallarySchema>
