import { describe, expect, it } from "vitest";
import { JobRepositoryMock } from '../../../../../test/mocks/job.repository.mock';
import { JobBuilder } from '../../../../../test/builders/job.builder';
import { CreateJobUseCase } from "./create-job.usecase";
import { InvalidFieldsError } from "../../../../shared/errors/client-side/invalid-fields.error";

// system under test
const sut = new CreateJobUseCase(JobRepositoryMock)

describe('#CreateJobUseCase', () => {

  it('should create a new job', async () => {
    const job = new JobBuilder().withoutId().build();
    const jobDTO = job.toDTO();

    delete jobDTO.id;
    await sut.execute(jobDTO);

    expect(JobRepositoryMock.create).toBeCalledTimes(1);
  });

  it('should throw InvalidFieldsError when there are invalid fields', async () => {
    // has id, and is invalid on creation use case
    const job = new JobBuilder().build();
    await expect(sut.execute(job.toDTO())).rejects.toThrowError(InvalidFieldsError);
  })
})
