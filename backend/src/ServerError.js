export default class ServerError extends Error {
    ServerError(statusCode, message) {
      this.statusCode = statusCode
      this.message = message
    }
  }