import { APIGatewayEvent } from "aws-lambda";
import { createJobsController } from "../../infra/factories/jobs.factory";
import { ClientSideError } from "../../../shared/errors/client-side/client-side.error";
import { CreateJobDTO } from "../../data/use-cases/create-job/create-job.usecase";

const jobsController = createJobsController();

function extractBody(event: APIGatewayEvent) {
  const body = event.body ?? '';
  return JSON.parse(body);
}

function handleError(error: unknown) {
  if (error instanceof ClientSideError) {
    return { statusCode: 400, body: JSON.stringify({ errorMessage: error.message, error: error.errors }) }
  }
  console.log(error)
  return { statusCode: 500, body: JSON.stringify({ errorMessage: 'Internal Server Error' }) }
}

export async function create(event: APIGatewayEvent) {
  try {
    const body = extractBody(event) as CreateJobDTO;
    await jobsController.create(body)

    return Promise.resolve({
      statusCode: 201,
    });
  } catch (err) {
    return handleError(err)
  }
}
