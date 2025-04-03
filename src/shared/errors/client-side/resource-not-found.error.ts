export class ResourceNotFoundError extends Error {

  constructor(message: string, public errors: any) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      message: this.message,
      stack: this.stack,
      errors: this.errors
    };
  }
}
