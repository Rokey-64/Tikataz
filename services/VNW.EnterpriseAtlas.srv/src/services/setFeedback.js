
/**
 * Set feedback to return to the user
 * @param {*} feedback - feedback object
 * @param {*} status - status of the request
 * @param {*} message - message to return to the user
 * @param {*} data - data to return to the user
 */
const setFeedback = (feedback, status, message='', data={}) => {
    if (!feedback) {
        throw new Error("Feedback is required");
    }

    feedback.status = status;
    feedback.message = message;
    feedback.data = data;

    return feedback;
};

export default setFeedback;