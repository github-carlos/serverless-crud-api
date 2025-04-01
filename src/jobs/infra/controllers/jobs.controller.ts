import { CreateJobDTO, CreateJobUseCase } from "../../data/use-cases/create-job/create-job.usecase";

export class JobsController {
  constructor(private createJobUseCase: CreateJobUseCase) { }

  async create(input: CreateJobDTO) {
    try {
      await this.createJobUseCase.execute(input)
    } catch (err) {
      console.log('Error on controller', JSON.stringify(err));
    }
  }
}
