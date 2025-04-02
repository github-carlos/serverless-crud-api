import { ClientSideError } from "../../../shared/errors/client-side/client-side.error"

export function handleError(error: unknown) {
  if (error instanceof ClientSideError) {
    return { statusCode: 400, body: JSON.stringify({ errorMessage: error.message, error: error.errors }) }
  }
  console.log(error)
  return { statusCode: 500, body: JSON.stringify({ errorMessage: 'Internal Server Error' }) }
}
