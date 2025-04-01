import { Job, JobFields } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { UseCase } from "../use-case.interface";

export type CreateJobDTO = Omit<JobFields, 'id'>

export class CreateJobUseCase implements UseCase<CreateJobDTO, void> {

  constructor(private jobRepository: JobRepository) { }

  async execute(input: CreateJobDTO): Promise<void> {
    const job = new Job(input);

    await this.jobRepository.create(job)
  }
}
