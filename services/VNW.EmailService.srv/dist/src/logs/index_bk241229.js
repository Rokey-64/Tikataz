var _a;
import fluend from 'fluent-logger';
import file from 'fs';
import 'dotenv/config.js';
const env = process.env.NODE_ENV || 'development';
const tag = 'vnw.sms'; //
const [host, port] = [process.env.FLUENTD_HOST || 'localhost', process.env.FLUENTD_PORT || 24224];
const option = {
    host: process.env.FLUENTD_HOST || 'localhost',
    port: ((_a = process.env) === null || _a === void 0 ? void 0 : _a.FLUENTD_PORT) ? parseInt(process.env.FLUENTD_PORT) : 24224,
    timeout: 3.0,
    reconnectInterval: 100000 // 1 minute
};
/**
|--------------------------------------------------
| Define the log levels
|--------------------------------------------------
*/
export const level = {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
    DB_ERROR: 'dbErr',
};
/**
|--------------------------------------------------
| Configure the fluentd logger
|--------------------------------------------------
*/
fluend.configure(tag, option);
/**
|--------------------------------------------------
| Handle the exit event
|--------------------------------------------------
*/
process.on('exit', function () {
    fluend.end('Exit event triggered', undefined, () => {
        throw new Error('Fluentd logger has been closed');
    });
});
/**
|--------------------------------------------------
| Handle uncaught exceptions
|--------------------------------------------------
*/
process.on('uncaughtException', function (err) {
    fluend.end('Exit event triggered', undefined, () => {
        throw new Error('Fluentd logger has been closed');
    });
});
fluend.on('error', function (err) {
    /**
     * Logs combination
     */
    let error = `\n Fluentd::: >>>> Error:::  ${err} >>>> Date::: ${(new Date()).toString()}`;
    /**
     * Write to logs.txt
     */
    file.appendFile('logs.txt', error, function (err) {
        if (err)
            throw err;
        console.log('Saved!');
    });
});
/**
 * call log in development mode
 * @param  {...any} messages
 */
export const showMessage = (...messages) => {
    if (env === 'development') {
        console.log(messages);
    }
};
/**
 * this function emit log to fluentd (level, Time, Message, Address, RequestID, Metadata)
 * @param {*} level
 * @param {*} requestId
 * @param {*} message
 * @param {*} address
 * @param {*} metadata
 * @returns
 */
export const emitLog = (level, requestId, message, address, metadata) => {
    return new Promise((resolve, reject) => {
        /**
         * Define the log object
         */
        const log = {
            requestId: requestId || '00000000-0000-0000-0000-000000000000',
            message: message,
            address: address,
            metadata: metadata || {}
        };
        /**
         * Log the message to the console if the environment is development
         */
        showMessage(message);
        /**
         * Emit the log to the fluentd
         */
        fluend.emit(level, log, (err) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
};
export default emitLog;
