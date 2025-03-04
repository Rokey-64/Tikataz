import axios from "axios";
import 'dotenv/config';
import { showMessage } from "../fluentd-connection/fluentd-jack.js";
import status from "statuses";

const host = process.env.EMAIL_SERVER_IP || "localhost";
const mailServicePort = process.env.EMAIL_SERVER_PORT || 5051;
const environment = process.env.NODE_ENV || 'development';

/**
 * Call the mail service to send the mail
 * @param {*} payload 
 * @returns
 */
const mailSender = async (payload) => {
    if(environment === 'development') {
        showMessage('Đã gửi mail', payload);
        return { status: status('OK') };
    }

    const api = axios.create({
        baseURL: `http://${host}:${mailServicePort}`,
        timeout: 30000,
    });

    const result = await api.post('/sender', payload);
    return result.data;
}

export default mailSender;