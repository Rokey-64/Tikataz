var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
import sys from '../../sys/index.js';
import 'dotenv/config.js';
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
export const sendMail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: false,
        auth: {
            user: EMAIL_USER || '',
            pass: EMAIL_PASS || ''
        }
    });
    // Chuẩn bị nội dung email
    // let mailOptions:nodemailer.SendMailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: model.to,
    //     subject: model.subject,
    //     html: model.html
    //     // html: httmFormat(model.link)
    // };
    // Gửi email
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        if (error.code === 'EAUTH') {
            throw new sys.TkzException('The provided email or password is not correct', sys.errCode.EMAIL_SEND_FAILED);
        }
        throw new Error('Cannot send the email right now');
    }
});
