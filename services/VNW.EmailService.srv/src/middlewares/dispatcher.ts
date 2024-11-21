import { Router, Request, Response, NextFunction } from "express";
import { contact } from "../service/contact/index.js";
import sys from "../sys/index.js";
import "dotenv/config.js";
import emitlog, { level, showMessage } from "../logs/index.js";
import nodemailer, { Transporter } from 'nodemailer';
import checkRequiredFields from "../validations/checkRequiredFields.js";

/**
 * @description Send mail, app or phone
 * @returns 
 */
const dispatcher = async (req: Request, res: Response, next: NextFunction) => {
    const model = req.body;

    const result:boolean = checkRequiredFields(model, ['requestID', 'to', 'subject', 'content', 'type']);
    if (!result) {
        !req.feedback || sys.setFailedFeedback(req.feedback, sys.errCode.EMAIL_SEND_FAILED, 'Missing required fields');
        return res.status(400).json(req.feedback);
    }

    /**
     * when send mail failed, discard the request
     * @param err 
     * @returns 
     */
    const discard = (err: any) => {
        if (!(err instanceof sys.TkzException)) {
            emitlog(level.ERROR, req.id, err.message, 'sendMail', { prevReqID: model.requestID });
        }

        !req.feedback || sys.setFailedFeedback(req.feedback, err?.code || sys.errCode.SYSTEM_ERROR, err.message);
        return res.status(500).json(req.feedback);
    }

    switch (model.type) {
        case "mail":
            /**
             * Mail options
             */
            const mailOptions: nodemailer.SendMailOptions = {
                from: process.env.EMAIL_USER,
                to: model.to,
                subject: model.subject,
                html: model.content
            };

            await contact.sendMail(mailOptions).catch(err => {
                return discard(err);
            });

            break;
        case "app":
            break;
        case "phone":
            break;
    }

    
};

export default dispatcher;
