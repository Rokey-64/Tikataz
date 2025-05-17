import axios from 'axios';
// const env = process.env.NODE_ENV || 'development';
// const env = 'production';
// console.log(env);
const FLUENTD_HOST = process.env.FLUENTD_HOST;


const emitLog = async (level, tag, message, file, line) => {
    try {
        const payload = {
            level: level,
            tag: "vnw.users",
            message: message,
            file: file,
            line: line,
        };

        await axios.post(`${FLUENTD_HOST}`, payload, { timeout: 3000 });
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
    if (process.env.NODE_ENV === 'development') {
        console.log(...messages);
    }

    if (process.env.NODE_ENV === 'production') {
        emitLog(level.ERROR, env, messages, undefined, undefined);
    }
};


// export default emitLog;