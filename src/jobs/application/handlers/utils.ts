import { APIGatewayEvent } from "aws-lambda";

export function extractBody(event: APIGatewayEvent) {
  const body = event.body ?? '';
  return JSON.parse(body);
}

export function extractPathParams(event: APIGatewayEvent) {
  const params = event.pathParameters || {};
  return params;
}
