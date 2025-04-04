import { JobDTO } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { UseCase } from "../use-case.interface";

export type ListJobsUseCaseOuput = Promise<JobDTO[]>

export class ListJobsUseCase implements UseCase<undefined, ListJobsUseCaseOuput> {

  constructor(private jobsRepository: JobRepository) { }

  async execute(): ListJobsUseCaseOuput {
    const jobs = await this.jobsRepository.list();

    return jobs?.map(job => job.toDTO()) || [];
  }
}
