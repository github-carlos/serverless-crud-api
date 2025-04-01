import dynamoose from "dynamoose";
import { JobStatusEnum, SenioritiesEnum } from "../../../../core/entities/job.entity";

const SallarySchema = new dynamoose.Schema(
  {
    value: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "USD",
    },
  },
  { saveUnknown: false }
);

const CompanySchema = new dynamoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { saveUnknown: false }
);

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
      default: "ACTIVE",
    },
    isConfidential: { type: Boolean, default: false },
    company: CompanySchema,
  },
  { timestamps: true }
);


const JobModel = dynamoose.model("Job", JobSchema);

export { JobModel, JobSchema };
