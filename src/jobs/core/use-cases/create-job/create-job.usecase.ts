import { Job } from "../../entities/job.entity";
import { JobRepository } from "../../repositories/job.repository";
import { UseCase } from "../use-case.interface";

export type CreateJobInput = {}

export class CreateJobUseCase implements UseCase<CreateJobInput, void> {

  constructor(private jobRepository: JobRepository) { }

  async execute(input: CreateJobInput): Promise<void> {
    const job = new Job(input);

    await this.jobRepository.create(job)
  }
}
