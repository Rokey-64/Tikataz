import { Feedback } from "../../types/express";

/**
 * Set the failed feedback
 */
export const setFailedFeedback = (feadback : Feedback, code:number, message: string) => {
    feadback.error = {code: code, message:message};
    feadback.message = message;
    feadback.status = 'failed';
    return feadback;
}