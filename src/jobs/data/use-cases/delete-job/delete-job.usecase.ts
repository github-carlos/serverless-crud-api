import { JobRepository } from '../../../core/repositories/job.repository'
import { UseCase } from '../use-case.interface'

export class DeleteJobUseCase implements UseCase<string, void> {
  constructor(private jobsRepository: JobRepository) {}

  async execute(jobId: string) {
    await this.jobsRepository.delete(jobId)
  }
}
