import { CreateJobDTO, CreateJobUseCase } from "../../data/use-cases/create-job/create-job.usecase";
import { DeleteJobUseCase } from "../../data/use-cases/delete-job/delete-job.usecase";
import { GetJobUseCase } from "../../data/use-cases/get-job/get-job.usecase";
import { ListJobsUseCase } from "../../data/use-cases/list-jobs/list-jobs.usecase";
import { UpdateJobInput, UpdateJobUseCase } from "../../data/use-cases/update-job/update-job.usecase";

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
