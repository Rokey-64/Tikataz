import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();
const { EMAIL_SERVER, EMAIL_PORT, EMAIL_USER, EMAIL_LOGIN, EMAIL_PASS } = process.env;

/**
 * Send email middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const sendEmail = async (req, res, next) => {
    const clientOptions = req.body?.options;
    if (!clientOptions) {
        return res.status(400).json({ error: 'Email options are required' });
    }

    if (!clientOptions?.to) {
        return res.status(400).json({ error: 'Recipient email address is required' });
    }

    if (!clientOptions?.subject) {
        return res.status(400).json({ error: 'Email subject is required' });
    }

    if (!clientOptions?.content) {
        return res.status(400).json({ error: 'Email content is required' });
    }
    
    const mailOptions = {
        from: EMAIL_USER,
        to: clientOptions?.to,
        subject: clientOptions?.subject,
        // text: clientOptions?.text,
        html: clientOptions?.content
    };


    const transporter = nodemailer.createTransport({
        host: EMAIL_SERVER,
        port: Number(EMAIL_PORT),
        secure: false,
        auth: {
            user: EMAIL_LOGIN || '',
            pass: EMAIL_PASS || ''
        }
    });

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }

    return next();
}

export default sendEmail;