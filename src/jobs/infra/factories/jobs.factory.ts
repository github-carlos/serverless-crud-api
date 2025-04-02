import { DynamoDBJobRepository } from "../../data/repositories/dynamodb/job-dynamodb.repository";
import { setupDynamoDB } from "../../data/repositories/dynamodb/setup";
import { CreateJobUseCase } from "../../data/use-cases/create-job/create-job.usecase";
import { DeleteJobUseCase } from "../../data/use-cases/delete-job/delete-job.usecase";
import { ListJobsUseCase } from "../../data/use-cases/list-jobs/list-jobs.usecase";
import { UpdateJobUseCase } from "../../data/use-cases/update-job/update-job.usecase";
import { JobsController } from "../controllers/jobs.controller";

setupDynamoDB();

export function createJobsController(): JobsController {
  const jobsRepository = new DynamoDBJobRepository()
  const createJobUseCase = new CreateJobUseCase(jobsRepository)
  const listJobsUseCase = new ListJobsUseCase(jobsRepository);
  const deleteJobUseCase = new DeleteJobUseCase(jobsRepository);
  const updateJobUseCase = new UpdateJobUseCase(jobsRepository);
  const jobsController = new JobsController(createJobUseCase, listJobsUseCase, deleteJobUseCase, updateJobUseCase);

  return jobsController;
}
