import { z, ZodSchema } from 'zod'
import { Sallary, SallarySchema } from '../value-objects/sallary.value-object'
import { InvalidFieldsError } from '../../../shared/errors/client-side/invalid-fields.error'
import { v4 } from 'uuid'
import {
  CompanyDTO,
  CompanySchema,
} from '../value-objects/company.value-object'

export const SenioritiesEnum = z.enum(['JUNIOR', 'MID_LEVEL', 'SENIOR'])
export const JobStatusEnum = z.enum(['ACTIVE', 'INACTIVE'])

export const JobFieldsSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(3),
    description: z.string().min(10).optional(),
    sallary: SallarySchema,
    seniority: SenioritiesEnum,
    status: JobStatusEnum.default('ACTIVE'),
    isConfidential: z.boolean().default(false),
    company: CompanySchema.optional(),
  })
  .strict()

export type JobDTO = z.infer<typeof JobFieldsSchema>

export class Job {
  constructor(private fields: JobDTO) {
    this.validate()

    if (!this.fields.id) {
      this.fields.id = v4()
    }
  }

  validate(schema?: ZodSchema) {
    schema = schema ?? JobFieldsSchema

    const zodValidation = schema.safeParse(this.fields)

    if (!zodValidation.success) {
      throw new InvalidFieldsError(zodValidation.error.toString())
    }

    this.fields = zodValidation.data
  }

  toDTO() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      seniority: this.seniority,
      status: this.status,
      sallary: this.sallary,
      isConfidential: this.isConfidential,
      company: this.company,
    }
  }

  get id(): string | undefined {
    return this.fields.id
  }

  set id(id: string | undefined) {
    this.fields.id = id
    this.validate()
  }

  get title(): string {
    return this.fields.title
  }

  set title(title: string) {
    this.fields.title = title
    this.validate()
  }

  get sallary(): z.infer<typeof SallarySchema> {
    return this.fields.sallary
  }

  set sallary(sallary: Sallary) {
    this.fields.sallary = sallary
    this.validate()
  }

  get description(): string | undefined {
    return this.fields.description
  }

  set description(description: string) {
    this.fields.description = description
    this.validate()
  }

  get seniority(): z.infer<typeof SenioritiesEnum> {
    return this.fields.seniority
  }

  set seniority(seniority: z.infer<typeof SenioritiesEnum>) {
    this.fields.seniority = seniority
    this.validate()
  }

  get status(): z.infer<typeof JobStatusEnum> {
    return this.fields.status
  }

  set status(status: z.infer<typeof JobStatusEnum>) {
    this.fields.status = status
    this.validate()
  }

  get isConfidential(): boolean {
    return this.fields.isConfidential
  }

  set isConfidential(isConfidential: boolean) {
    this.fields.isConfidential = isConfidential
    this.validate()
  }

  get company(): CompanyDTO | undefined {
    return this.fields.company
  }

  set company(company: CompanyDTO | undefined) {
    this.fields.company = company
    this.validate()
  }
}
