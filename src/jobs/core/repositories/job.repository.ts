import { Job } from "../entities/job.entity";

export interface JobRepository {
  create(job: Job): Promise<void>
  list(): Promise<Job[]>;
  update(job: Partial<Job>): Promise<void>;
  delete(jobId: string): Promise<void>;
}
