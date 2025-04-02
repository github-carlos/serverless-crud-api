import { ClientSideError } from "./client-side.error";

export class InvalidFieldsError extends ClientSideError {
  constructor(message: string) {
    super('InvalidFieldsError', message);
  }
}
