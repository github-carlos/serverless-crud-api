import { ModelType } from "dynamoose/dist/General";
import { Job } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { JobItem, JobModel } from "./schemas/job.schema";
import { JobEntityMapper } from "./job-entity.mapper";
import { Condition } from "dynamoose/dist/Condition";
import { InvalidIdError } from "../../../../shared/errors/client-side/invalid-id.error";

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

  async update(id: string, job: Partial<Job>): Promise<void> {
    try {
      await this.model.update({ id }, job, { condition: new Condition().where('id').exists() });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      if (err.name === 'ConditionalCheckFailedException') {
        throw new InvalidIdError(id)
      }

      throw Error('Database Error');
    }
  }

  async delete(jobId: string): Promise<void> {
    try {
      await this.model.delete(jobId);
    } catch (err) {
      console.log("err", err);
    }
  }
}
