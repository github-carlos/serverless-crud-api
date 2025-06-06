import dynamoose from 'dynamoose'
import {
  JobStatusEnum,
  SenioritiesEnum,
} from '../../../../core/entities/job.entity'
import { Item } from 'dynamoose/dist/Item'
import { SallaryDTO } from '../../../../core/value-objects/sallary.value-object'
import { z } from 'zod'
import { CompanyDTO } from '../../../../core/value-objects/company.value-object'
import { isLocalEnv } from '../../../../../shared/utils'

const SallarySchema = new dynamoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
  { saveUnknown: false },
)

const CompanySchema = new dynamoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { saveUnknown: false },
)

const JobSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    title: { type: String, required: true },
    description: { type: String },
    sallary: SallarySchema,
    seniority: {
      type: String,
      enum: SenioritiesEnum.options,
      required: true,
    },
    status: {
      type: String,
      enum: JobStatusEnum.options,
      default: 'ACTIVE',
    },
    isConfidential: { type: Boolean, default: false },
    company: CompanySchema,
  },
  { timestamps: true },
)

export class JobItem extends Item {
  id!: string
  title!: string
  description!: string
  sallary!: SallaryDTO
  seniority!: z.infer<typeof SenioritiesEnum>
  status!: z.infer<typeof JobStatusEnum>
  company!: CompanyDTO
  isConfidential!: boolean
}

const options = isLocalEnv ? {} : { create: false, waitForActive: false };

const JobModel = dynamoose.model<JobItem>(
  `Job_${process.env.NODE_ENV}`,
  JobSchema,
  options
)

export { JobModel, JobSchema }
