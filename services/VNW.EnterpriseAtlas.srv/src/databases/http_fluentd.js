import axios from 'axios';
const env = process.env.NODE_ENV || 'development';
const FLUENTD_HOST = 'http://103.218.122.181:24230/vnw.atlas'; 

export const emitLog = async (level, tag, message, file, line) => {
    try {
        const payload = {
            level: level,
            tag: "vnw.atlas",
            message: message,
            file: file,
            line: line,
        };

        await axios.post(`${FLUENTD_HOST}`, payload);
    } catch (error) {
        console.error('Error sending log:', error.message);
    }
};



export const level = {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
    DB_ERROR: 'dbErr',
};

export const showMessage = (...messages) => {
    if (env === 'development') {
        console.log("⛔⛔", messages);
    }
    if (env === 'production') {
        emitLog(level.ERROR, env, messages, undefined, undefined);
    }
};