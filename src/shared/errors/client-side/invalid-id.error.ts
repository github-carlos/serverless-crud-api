import { ClientSideError } from './client-side.error'

export class InvalidIdError extends ClientSideError {
  constructor(message: string) {
    super(message, 'InvalidIdError')
  }
}
