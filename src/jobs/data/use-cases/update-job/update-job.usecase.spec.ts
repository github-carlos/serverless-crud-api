import { describe, expect, it } from 'vitest'
import { JobRepositoryMock } from '../../../../../test/mocks/job.repository.mock'
import { JobBuilder } from '../../../../../test/builders/job.builder'
import { UpdateJobUseCase } from './update-job.usecase'

const repository = JobRepositoryMock()
// system under test
const sut = new UpdateJobUseCase(repository)

describe('#UpdateJobUseCase', () => {
  it('should update a job', async () => {
    const job = new JobBuilder().build()

    const newData = { title: 'New title' }
    await sut.execute({ id: job.id!, data: newData })

    expect(repository.update).toHaveBeenCalledTimes(1)
    expect(repository.update).toHaveBeenCalledWith(job.id, newData)
  })
})
