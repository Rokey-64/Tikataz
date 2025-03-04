'use strict';

import 'dotenv/config'
import Sequelize from 'sequelize'
import dbc from '../../../dbc.json' assert {type: 'json'}
import emitLog, { level, showMessage } from '../fluentd-connection/fluentd-jack.js'

const env = process.env.NODE_ENV || 'development';
const dialect = 'mysql';
const conf = {
    replication: {
        read: [],
        write: {
            host: '',
            username: '',
            password: '',
        },
    }
};
const pool = {
    max: 5,
    min: 0,
    acquire: 15000,
    idle: 15000
};
const TIME_OUT = 5000;
const RECONNECT_MAX_COUNT = 5;
let count = 0;
const password = process.env.READ_MYSQL_PW || '';
const dbname = process.env.DB_NAME || '';
let port = '';

await (
    async () => {
        const mysqlc = dbc[dialect][env];
        const read = [];
        port = mysqlc.port;

        /**
         * update the configuration list of read nodes
         */
        for (let key in mysqlc.read) {

            const nodes = mysqlc.read[key];

            conf.replication.read.push(
                {
                    host: nodes.host || '',
                    username: nodes.username || '',
                    password: password
                }
            );
        }

        const writeNode = mysqlc.write;
        conf.replication.write = {
            host: writeNode.host || '',
            username: writeNode.username || '',
            password: password
        };
    }
).call();


/**
|--------------------------------------------------
| Create a mysql connection
|--------------------------------------------------
*/
const mysqlConn = new Sequelize(dbname, null, null,
    {
        dialect: 'mysql',
        port: port || '',
        replication: conf.replication,
        pool: pool
    }
);

async function Connect(msg) {
    try {
        await mysqlConn.authenticate();
        showMessage(`Mysql >> Action::: ${msg} >>> State::: Connected to the database`);
    } catch (err) {
        showMessage(`Mysql >> Action::: ${msg} >>> State::: Connection failed`);
        if (count === RECONNECT_MAX_COUNT) {
            await emitLog(level.DB_ERROR, null, `Mysql | ${msg} | Connection failed | ${err}`, 'src/database/mysql-jack', null);
            return;
        }
        setTimeout(Connect, TIME_OUT); // Thử lại sau 5 giây
        count++;
    }
};
await Connect('connection');

/**
|--------------------------------------------------
| check health of database
|--------------------------------------------------
*/
mysqlConn.afterDisconnect(async () => {
    await Connect('reconnection');
});

export default mysqlConn