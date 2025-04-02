import { CreateJobDTO, CreateJobUseCase } from "../../data/use-cases/create-job/create-job.usecase";

export class JobsController {
  constructor(private createJobUseCase: CreateJobUseCase) { }

  async create(input: CreateJobDTO) {
    await this.createJobUseCase.execute(input)
  }
}
