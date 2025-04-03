import { ResourceNotFoundError } from "../../../shared/errors/client-side/resource-not-found.error"


export class JobNotFoundError extends ResourceNotFoundError {
  constructor(message: string) {
    super(message, 'JobNotFoundError',);
  }
}
