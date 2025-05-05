import axios from "axios";
import 'dotenv/config';

const host = process.env.EMAIL_SERVER_IP || "localhost";
const mailServicePort = process.env.EMAIL_SERVER_PORT || 5052;
const environment = process.env.NODE_ENV || 'development';

/**
 * Call the mail service to send the mail
 * @param {*} payload 
 * @returns
 */
const mailSender = async (payload) => {

    const api = axios.create({
        baseURL: `http://${host}:${mailServicePort}`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    try {
        const result = await api.post('/api/v1/contact/mail-sender', {
            options: payload,
        });
    }
    catch (err) {
        throw err;
    }
}

export default mailSender;