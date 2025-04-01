import { APIGatewayProxyResultV2, Context } from "aws-lambda";
import { createJobsController } from "../../infra/factories/jobs.factory";

const jobsController = createJobsController();

export async function create(event: APIGatewayProxyResultV2, context: Context) {
  console.log('EVENT', event);
  console.log('Context', context);

  await jobsController.create({ title: 'teste' } as any)

  return Promise.resolve({
    statusCode: 201,
    body: JSON.stringify({ teste: 'Hello World' }),
  });
}
