import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

export function hello(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ teste: 'Hello World' }),
  })
}
