import fluend from 'fluent-logger';
import file from 'fs';
import 'dotenv/config.js'

const env = process.env.NODE_ENV || 'development';
const tag = 'vnw.users';//
const [host, port] = [process.env.FLUENTD_HOST || 'localhost', process.env.FLUENTD_PORT || 24224];
const option = {
    host: process.env.FLUENTD_HOST || 'localhost',
    port: process.env.FLUENTD_PORT || 24224,
    timeout: 3.0,
    reconnectInterval: 100000 // 1 minute
}

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
    fluend.end();
});

/**
|--------------------------------------------------
| Handle uncaught exceptions
|--------------------------------------------------
*/
process.on('uncaughtException', function (err) {
    fluend.end();
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
        if (err) throw err;
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
 * This function emit log to fluentd
 * @param {*} level log level that was got from Level object
 * @param {*} requestId request id
 * @param {*} message message that you want to log
 * @param {*} address where the log was emitted
 * @param {*} metadata additional information
 * @returns 
 */
export const emitLog =  (level, requestId,  message, address, metadata) => {
    return new Promise((resolve, reject) => {
        /**
         * Define the log object
         */
        const log = {
            requestId: requestId || '00000000-0000-0000-0000-000000000000',
            message: message,
            address: address,
            metadata: metadata || {}
        }

        /**
         * Log the message to the console if the environment is development
         */
        showMessage('Emitlog:::', message);

        /**
         * Emit the log to the fluentd
         */
        fluend.emit(level, log, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
};

export default emitLog;