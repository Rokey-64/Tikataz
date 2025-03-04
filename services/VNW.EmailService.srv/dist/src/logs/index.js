var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const env = process.env.NODE_ENV || 'development';
const FLUENTD_HOST = 'http://103.218.122.181:24230/vnw.users';
const emitLog = (level, tag, message, file, line) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            level: level,
            tag: "vnw.users",
            message: message,
            file: file,
            line: line,
        };
        yield axios.post(`${FLUENTD_HOST}`, payload);
    }
    catch (error) { // Dùng `any` cho các trường hợp lỗi chưa xác định rõ kiểu.
        console.error('Error sending log:', error.message);
    }
});
export const level = {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
    DB_ERROR: 'dbErr',
}; // Sử dụng `as const` để bảo toàn kiểu giá trị không đổi.
export const showMessage = (...messages) => {
    if (env === 'development') {
        console.log(...messages);
    }
};
export default emitLog;
