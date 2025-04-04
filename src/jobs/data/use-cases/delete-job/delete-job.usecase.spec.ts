import { describe, expect, it } from "vitest";
import { JobRepositoryMock } from '../../../../../test/mocks/job.repository.mock';
import { JobBuilder } from '../../../../../test/builders/job.builder';
import { DeleteJobUseCase } from "./delete-job.usecase";

const repository = JobRepositoryMock()
// system under test
const sut = new DeleteJobUseCase(repository)

describe('#DeleteJobUseCase', () => {

  it('should delete a job', async () => {
    const job = new JobBuilder().build();

    await sut.execute(job.id!);

    expect(repository.delete).toHaveBeenCalledWith(job.id);
    expect(repository.delete).toBeCalledTimes(1);
  });
})
