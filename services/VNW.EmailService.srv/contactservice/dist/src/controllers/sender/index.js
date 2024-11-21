var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { contact } from "../../service/contact/index.js";
import sys from "../../sys/index.js";
import "dotenv/config.js";
import emitlog, { level } from "../../logs/index.js";
const router = Router();
/**
 * @description Send mail, app or phone
 * @returns
 */
const sender = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const model = req.body;
    /**
     * when send mail failed, discard the request
     * @param err
     * @returns
     */
    const discard = (err) => {
        if (!(err instanceof sys.TkzException)) {
            emitlog(level.ERROR, req?.id, err?.message, 'sendMail', { prevReqID: model?.requestID });
        }
        !req.feedback || sys.setFailedFeedback(req.feedback, (err === null || err === void 0 ? void 0 : err.code) || sys.errCode.SYSTEM_ERROR, err?.message);
        return res.json(req.feedback);
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
    !req.feedback || (req.feedback.status = 'success');
    !req.feedback || (req.feedback.message = 'Message sent successfully');
    return res.json(req.feedback);
});
router.post("/sender", sender, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
export default router;
