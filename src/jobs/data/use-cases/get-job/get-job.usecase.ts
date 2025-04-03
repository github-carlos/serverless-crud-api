import { JobDTO } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { JobNotFoundError } from "../../errors/job-not-found.error";
import { UseCase } from "../use-case.interface";

export class GetJobUseCase implements UseCase<string, Promise<JobDTO | undefined>> {

  constructor(private jobsRepository: JobRepository) { }

  async execute(jobId: string) {
    const job = await this.jobsRepository.findOne(jobId);

    if (!job) {
      throw new JobNotFoundError(`Job Not Found for id ${jobId}`);
    }

    return job.toDTO();
  }
}
