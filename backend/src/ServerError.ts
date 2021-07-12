export default class ServerError extends Error {
    constructor(
      public statusCode: number,
      public message: string
    ) {
      super();
    }
  }