import { CreateJobDTO, CreateJobUseCase } from "../../data/use-cases/create-job/create-job.usecase";
import { ListJobsUseCase } from "../../data/use-cases/list-jobs/list-jobs.usecase";

export class JobsController {
  constructor(private createJobUseCase: CreateJobUseCase, private listJobsUseCase: ListJobsUseCase) { }

  async create(input: CreateJobDTO) {
    await this.createJobUseCase.execute(input);
  }

  async list() {
    return this.listJobsUseCase.execute();
  }
}
