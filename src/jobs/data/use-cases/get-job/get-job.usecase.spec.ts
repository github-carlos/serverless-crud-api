import { describe, expect, it } from "vitest";
import { JobRepositoryMock } from '../../../../../test/mocks/job.repository.mock';
import { JobBuilder } from '../../../../../test/builders/job.builder';
import { GetJobUseCase } from "./get-job.usecase";
import { JobNotFoundError } from "../../errors/job-not-found.error";

// system under test
const sut = new GetJobUseCase(JobRepositoryMock)

describe('#GetJobUseCase', () => {

  it('should return a Job when id exists', async () => {
    const job = new JobBuilder().random().build();
    JobRepositoryMock.findOne.mockResolvedValueOnce(job)

    const foundJob = await sut.execute(job.id!);

    expect(JobRepositoryMock.findOne).toBeCalledWith(job.id);
    expect(JobRepositoryMock.findOne).toBeCalledTimes(1);
    expect(foundJob.id).equal(job.id);
  });

  it('shoudl throw JobNotFoundError when Job does not exists', async () => {

    JobRepositoryMock.findOne.mockResolvedValueOnce(undefined);

    await expect(sut.execute('invalid_uuid')).rejects.toThrowError(JobNotFoundError);
  })
})
