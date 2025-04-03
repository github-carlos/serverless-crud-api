import {
  CreateJobDTO,
  CreateJobUseCase,
  DeleteJobUseCase,
  GetJobUseCase,
  ListJobsUseCase,
  UpdateJobInput,
  UpdateJobUseCase
} from "../../data/use-cases";

export class JobsController {
  constructor(
    private createJobUseCase: CreateJobUseCase,
    private listJobsUseCase: ListJobsUseCase,
    private deleteJobUseCase: DeleteJobUseCase,
    private updateJobUseCase: UpdateJobUseCase,
    private getJobUseCase: GetJobUseCase
  ) { }

  async create(input: CreateJobDTO) {
    await this.createJobUseCase.execute(input);
  }

  async getJob(jobId: string) {
    return this.getJobUseCase.execute(jobId);
  }

  async list() {
    return this.listJobsUseCase.execute();
  }

  async delete(jobId: string) {
    return this.deleteJobUseCase.execute(jobId);
  }

  async updateJob(input: UpdateJobInput) {
    return this.updateJobUseCase.execute(input);
  }
}
