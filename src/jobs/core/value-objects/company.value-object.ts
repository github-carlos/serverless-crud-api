import { z } from 'zod'

export const CompanySchema = z
  .object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
  })
  .strict()

export type CompanyDTO = z.infer<typeof CompanySchema>
