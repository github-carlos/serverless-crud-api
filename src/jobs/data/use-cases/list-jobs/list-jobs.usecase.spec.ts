import { describe, expect, it } from "vitest";
import { JobRepositoryMock } from '../../../../../test/mocks/job.repository.mock';
import { JobBuilder } from '../../../../../test/builders/job.builder';
import { ListJobsUseCase } from "./list-jobs.usecase";

const repository = JobRepositoryMock()
// system under test
const sut = new ListJobsUseCase(repository)

describe('#ListJobsUseCase', () => {

  it('should list all jobs', async () => {
    const jobs = [new JobBuilder().build(), new JobBuilder().build(), new JobBuilder().build()];
    repository.list.mockResolvedValueOnce(jobs);

    const foundJobs = await sut.execute();

    expect(repository.list).toHaveBeenCalledTimes(1);
    expect(foundJobs.length).toBe(jobs.length);
  });
})
