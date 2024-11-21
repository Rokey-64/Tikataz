/**
 * declare a class extend Error
 */
class TkzException extends Error {
    constructor(message:string, ecode:number) {
      super(message);
      this.name = 'RegisterException';
      this.message = message;
      let code:number = ecode;
  
      // Ensure the stack trace is captured correctly (for Node.js)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, TkzException);
      }
    }
  }
  
  export default TkzException;