export class ClientSideError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    message: string,
    public errors: any,
  ) {
    super(message)

    Error.captureStackTrace(this, this.constructor)
  }

  toJSON() {
    return {
      message: this.message,
      stack: this.stack,
      errors: this.errors,
    }
  }
}
