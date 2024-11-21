import { Router, Request, Response, NextFunction } from "express";
import dispatcher from "../middlewares/dispatcher.js";

const router = Router();


router.post("/sender", dispatcher, async (req, res, next) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   requestID: <string> (Required) - The previous request ID.
     *   to: <string> (Required) - The recipient's address to send the message to.
     *   subject: <string> (Required) - The email subject.
     *   content: <string> (Required) - The email content.
     *   type: <string> (Required) - The type of message to send. Possible values are "mail", "app", and "phone".
     * }
     * 
     * Example request body:
     * 
     * {
     *   "requestID": "123456",
     *   "to": "vn",
     *   "subject": "123456"
     *   "content": "<p>Helo</p>",
     *   "type": "mail"
     * }
     */

    /**
     * Destroy the session
     * 
     * Fields:
     * * req.session - The session object.
     */

    !req.feedback || (req.feedback.status = 'success');
    !req.feedback || (req.feedback.message = 'Message sent successfully');
    return res.status(200).json(req.feedback);
});

export default router;