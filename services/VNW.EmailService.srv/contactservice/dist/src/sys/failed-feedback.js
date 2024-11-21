/**
 * Set the failed feedback
 */
export const setFailedFeedback = (feadback, code, message) => {
    feadback.error = { code: code, message: message };
    feadback.message = message;
    feadback.status = 'failed';
    return feadback;
};
