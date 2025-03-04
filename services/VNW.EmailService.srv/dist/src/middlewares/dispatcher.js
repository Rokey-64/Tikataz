var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { contact } from "../service/contact/index.js";
import sys from "../sys/index.js";
import "dotenv/config.js";
import emitlog, { level } from "../logs/index.js";
import checkRequiredFields from "../validations/checkRequiredFields.js";
/**
 * @description Send mail, app or phone
 * @returns
 */
const dispatcher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const model = req.body;
    const result = checkRequiredFields(model, ['requestID', 'to', 'subject', 'content', 'type']);
    if (!result) {
        !req.feedback || sys.setFailedFeedback(req.feedback, sys.errCode.EMAIL_SEND_FAILED, 'Missing required fields');
        return res.status(400).json(req.feedback);
    }
    /**
     * when send mail failed, discard the request
     * @param err
     * @returns
     */
    const discard = (err) => {
        if (!(err instanceof sys.TkzException)) {
            emitlog(level.ERROR, req.id, err.message, 'sendMail', { prevReqID: model.requestID });
        }
        !req.feedback || sys.setFailedFeedback(req.feedback, (err === null || err === void 0 ? void 0 : err.code) || sys.errCode.SYSTEM_ERROR, err.message);
        return res.status(500).json(req.feedback);
    };
    switch (model.type) {
        case "mail":
            /**
             * Mail options
             */
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: model.to,
                subject: model.subject,
                html: model.content
            };
            yield contact.sendMail(mailOptions).catch(err => {
                return discard(err);
            });
            break;
        case "app":
            break;
        case "phone":
            break;
    }
});
export default dispatcher;
