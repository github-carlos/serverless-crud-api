import { DynamoDBJobRepository } from "../../data/repositories/dynamodb/job-dynamodb.repository";
import { setupDynamoDB } from "../../data/repositories/dynamodb/setup";
import { CreateJobUseCase } from "../../data/use-cases/create-job/create-job.usecase";
import { JobsController } from "../controllers/jobs.controller";

setupDynamoDB();

export function createJobsController(): JobsController {
  const jobsRepository = new DynamoDBJobRepository()
  const createJobUseCase = new CreateJobUseCase(jobsRepository)
  const jobsController = new JobsController(createJobUseCase)

  return jobsController;
}
