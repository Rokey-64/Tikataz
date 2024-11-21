/**
 * declare a class extend Error
 */
class TkzRegException extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'RegisterException';
    this.message = message;
    this.code = code;

    // Ensure the stack trace is captured correctly (for Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TkzRegException);
    }
  }
}

export default TkzRegException;