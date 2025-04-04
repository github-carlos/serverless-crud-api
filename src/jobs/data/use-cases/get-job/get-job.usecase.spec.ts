import { describe, expect, it } from "vitest";
import { JobRepositoryMock } from '../../../../../test/mocks/job.repository.mock';
import { JobBuilder } from '../../../../../test/builders/job.builder';
import { GetJobUseCase } from "./get-job.usecase";
import { JobNotFoundError } from "../../errors/job-not-found.error";

const repository = JobRepositoryMock()
// system under test
const sut = new GetJobUseCase(repository)

describe('#GetJobUseCase', () => {

  it('should return a Job when id exists', async () => {
    const job = new JobBuilder().random().build();
    repository.findOne.mockResolvedValueOnce(job)

    const foundJob = await sut.execute(job.id!);

    expect(repository.findOne).toBeCalledWith(job.id);
    expect(repository.findOne).toBeCalledTimes(1);
    expect(foundJob.id).equal(job.id);
  });

  it('shoudl throw JobNotFoundError when Job does not exists', async () => {

    repository.findOne.mockResolvedValueOnce(undefined);

    await expect(sut.execute('invalid_uuid')).rejects.toThrowError(JobNotFoundError);
  })
})
