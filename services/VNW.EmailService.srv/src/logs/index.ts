import axios from 'axios';

const env: string = process.env.NODE_ENV || 'development';
const FLUENTD_HOST: string = 'http://103.218.122.181:24230/vnw.users';

const emitLog = async (
    level: string, 
    tag: any, 
    message: string, 
    file: any, 
    line: any
): Promise<void> => {
    try {
        const payload = {
            level: level,
            tag: "vnw.users",
            message: message,
            file: file,
            line: line,
        };

        await axios.post(`${FLUENTD_HOST}`, payload);
    } catch (error: any) { // Dùng `any` cho các trường hợp lỗi chưa xác định rõ kiểu.
        console.error('Error sending log:', error.message);
    }
};

export const level = {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
    DB_ERROR: 'dbErr',
} as const; // Sử dụng `as const` để bảo toàn kiểu giá trị không đổi.

export const showMessage = (...messages: any[]): void => { // `any[]` để chấp nhận nhiều kiểu dữ liệu khác nhau.
    if (env === 'development') {
        console.log(...messages);
    }
};


export default emitLog;
