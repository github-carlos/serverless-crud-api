import { z } from 'zod'
import { Job, JobFieldsSchema } from '../../../core/entities/job.entity'
import { JobRepository } from '../../../core/repositories/job.repository'
import { UseCase } from '../use-case.interface'
import { InvalidFieldsError } from '../../../../shared/errors/client-side/invalid-fields.error'

export const CreateJobFieldsSchema = JobFieldsSchema.omit({ id: true })
export type CreateJobDTO = z.infer<typeof CreateJobFieldsSchema>

export class CreateJobUseCase implements UseCase<CreateJobDTO, void> {
  constructor(private jobRepository: JobRepository) {}

  async execute(input: CreateJobDTO): Promise<void> {
    CreateJobFieldsSchema.safeParse(input)

    const validation = CreateJobFieldsSchema.safeParse(input)

    if (!validation.success) {
      throw new InvalidFieldsError(validation.error.toString())
    }

    const job = new Job(input)

    await this.jobRepository.create(job)
  }
}
