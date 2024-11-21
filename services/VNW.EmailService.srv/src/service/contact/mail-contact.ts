import nodemailer, {Transporter} from 'nodemailer';
import sys from '../../sys/index.js';
import 'dotenv/config.js';


const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env as ProcessEnv;

export const sendMail = async (mailOptions:nodemailer.SendMailOptions) => {

    const transporter: Transporter = nodemailer.createTransport({
        host: EMAIL_HOST ,
        port: Number(EMAIL_PORT),
        secure: false,
        auth: {
            user: EMAIL_USER || '',
            pass: EMAIL_PASS || ''
        }
    });


    // Gửi email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        if(error.code === 'EAUTH'){
            throw new sys.TkzException('The provided email or password is not correct', sys.errCode.EMAIL_SEND_FAILED);
        }
        throw new Error('Cannot send the email right now');
    }
};

