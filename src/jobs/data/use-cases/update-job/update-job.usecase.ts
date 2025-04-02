import { Job, JobDTO } from "../../../core/entities/job.entity";
import { JobRepository } from "../../../core/repositories/job.repository";
import { UseCase } from "../use-case.interface";

export type UpdateJobInput = {
  id: string,
  data: Partial<JobDTO>
}
export class UpdateJobUseCase implements UseCase<UpdateJobInput, void> {

  constructor(private jobRepository: JobRepository) { }

  async execute(input: UpdateJobInput) {
    await this.jobRepository.update(input.id, input.data);
  }
}
