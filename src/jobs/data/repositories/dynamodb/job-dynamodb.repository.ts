import { ModelType } from "dynamoose/dist/General";
import { Job } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { AnyItem } from "dynamoose/dist/Item";
import { JobModel } from "./schemas/job.schema";

export class DynamoDBJobRepository implements JobRepository {

  private model: ModelType<AnyItem>;

  constructor() {
    this.model = JobModel;
  }

  async create(job: Job): Promise<void> {
    await this.model.create(job.toDTO());
  }
  async list(): Promise<Job[]> {
    const items = await this.model.query().exec()
    console.log('VALUES', items.values())
    return []
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
