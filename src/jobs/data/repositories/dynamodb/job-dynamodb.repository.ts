import { ModelType } from "dynamoose/dist/General";
import { Job } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { JobItem, JobModel } from "./schemas/job.schema";
import { JobEntityMapper } from "./job-entity.mapper";

export class DynamoDBJobRepository implements JobRepository {

  private model: ModelType<JobItem>;

  constructor() {
    this.model = JobModel;
  }

  async create(job: Job): Promise<void> {
    await this.model.create(job.toDTO());
  }

  async list(): Promise<Job[]> {
    const queriedItems = await this.model.scan().exec()
    const items = queriedItems.map(JobEntityMapper.toEntity);
    return items;
  }

  update(job: Partial<Job>): Promise<void> {
    console.log('job', job)
    throw new Error("Method not implemented.");
  }

  delete(jobId: string): Promise<void> {
    console.log('job', jobId)
    throw new Error("Method not implemented.");
  }
}
