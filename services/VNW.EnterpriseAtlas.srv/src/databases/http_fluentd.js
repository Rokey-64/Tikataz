import { FluentClient } from '@fluent-org/logger';
const env = process.env.NODE_ENV || 'development';

const logger = new FluentClient('vnw.atlas', {
    socket: {
        host: '103.218.122.181',
        port: 24230, 
        timeout: 3000, // 3 seconds
    }
});

export const emitLog = async (level, tag, message, file, line) => {
    showMessage('Emitlog:::', message);
    
    await logger.emit("text thử", {
        level: level,
        tag: tag,
        message: message,
        file: file,
        line: line
    });

    
}

export const level = {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
    DB_ERROR: 'dbErr',
};

export const showMessage = (...messages) => {
    if (env === 'development') {
        console.log(messages);
    }
};