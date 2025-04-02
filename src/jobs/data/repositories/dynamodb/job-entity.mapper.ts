import { Job } from "../../../core/entities/job.entity";
import { JobItem } from "./schemas/job.schema";

export class JobEntityMapper {
  static toEntity(jobItem: JobItem): Job {
    return new Job({
      id: jobItem.id,
      title: jobItem.title,
      description: jobItem.description,
      sallary: jobItem.sallary,
      seniority: jobItem.seniority,
      company: jobItem.company,
      isConfidential: jobItem.isConfidential,
      status: jobItem.status
    })
  }
}

