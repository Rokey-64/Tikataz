import nodemailer from 'nodemailer';
import 'dotenv/config.js';

const httmFormat = (link) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Xác nhận tài khoản</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">

            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
                <h1 style="color: #333;">Chào mừng bạn!</h1>
                <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấn vào liên kết dưới đây để xác nhận tài khoản của bạn:</p>
                <p style="text-align: center; margin-top: 20px;"><a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Xác nhận tài khoản</a></p>
                <p>Nếu bạn không yêu cầu tạo tài khoản, vui lòng bỏ qua email này.</p>
                <br>
                <p style="font-size: 0.8em; color: #777;">Đây là email tự động, vui lòng không trả lời.</p>
            </div>

        </body>
        </html>
    `;
}

const sendMail = async (model) => {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Chuẩn bị nội dung email
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: model.to,
        subject: model.subject,
        html: httmFormat(model.link)
    };

    // Gửi email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
}

export default sendMail;

