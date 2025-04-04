import { ClientSideError } from '../../../shared/errors/client-side/client-side.error'
import { ResourceNotFoundError } from '../../../shared/errors/client-side/resource-not-found.error'

export function handleError(error: unknown) {
  if (error instanceof ClientSideError) {
    return formatError(error.message, error.errors, 400)
  }

  if (error instanceof ResourceNotFoundError) {
    return formatError(error.message, error.errors, 404)
  }

  console.log(error)
  return formatError('Internal Server Error', undefined, 500)
}

function formatError(errorMessage: string, error: unknown, statusCode: number) {
  return { statusCode, body: JSON.stringify({ errorMessage, error }) }
}
