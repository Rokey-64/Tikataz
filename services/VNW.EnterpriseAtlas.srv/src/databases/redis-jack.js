'use strict'

import redis from 'ioredis'
import 'dotenv/config'
import url from 'url'
import dbc from './dbc.json' assert {type: 'json'}
// import emitLog, { level, showMessage } from './fluentd-jack'
import {emitLog, level, showMessage} from './http_fluentd.js'

const TIME_OUT = 15000;
const env = process.env.NODE_ENV || 'development';
const dialect = 'redis';
const conf = [];
let setReconnectTimeout = null;

/**
|--------------------------------------------------
| read dbc file and create cluster configuration
|--------------------------------------------------
*/
await (
    async () => {
        if (!dbc || !dbc[dialect] || !dbc[dialect][env]) {
            await emitLog(level.DB_ERROR, null, 'No redis configuration found | 01', 'src/database/redis-jack', null);
            return;
        }

        let rdc = dbc[dialect][env];
        for (let key in rdc) {
            let item = rdc[key];
            if (!item) {
                await emitLog(level.DB_ERROR, null, 'No redis configuration found | 02', 'src/database/redis-jack', null);
                continue;
            }

            let port = new url.URL(item).port;
            let host = new url.URL(item).hostname;
            if (port && host) {
                conf.push({
                    port: port,
                    host: host
                });
            }
        }
    }
).call();

/**
|--------------------------------------------------
| Create a Redis cluster with user name is root and pass is ********
|--------------------------------------------------
*/
export const cluster = new redis.Cluster(conf, {
    redisOptions: {
        password: process.env.REDIS_CLUSTER_PASSWORD,
        connectTimeout: TIME_OUT
    }
});

/**
|--------------------------------------------------
| handle redis state
|--------------------------------------------------
*/
(() => {
    cluster.on('error', async (err) => {
        await emitLog(level.DB_ERROR, null, `Redis | An error occured | ${err}`, 'src/database/redis-jack', null);
    })

    cluster.on('ready', () => {
        showMessage('Redis::: Ready');
    })

    cluster.on('reconnecting', async () => {
        if (!setReconnectTimeout) {
            setReconnectTimeout = setTimeout(async () => {
                await emitLog(level.DB_ERROR, null, `Redis::: Disconnected | TIME_OUT`, 'src/database/redis-jack', null);
                cluster.quit();
            }, TIME_OUT);
        }
    })
}).call();

/**
 * inport a key value pair to the Redis client
 * @param {*} key 
 * @param {*} value 
 * @param {*} expiresIn - the time to live for the key in seconds
 */
const setRedisKey = async (key, value, expiresIn) => {
    try {
        const result = await cluster.set(key, value,'NX', 'EX', expiresIn);
    } catch (error) {
        throw error;
    }

    return true;
}

/**
 * inport a key value pair to the Redis client
 * @param {string} key 
 * @param {*} value 
 * @param {number} expiresIn - the time to live for the key in seconds, if not provided, the key will not expire
 */
const setRedisKeyOveride = async (key, value, expiresIn) => {
    try {
        let result;
        if(expiresIn) {
            result = await cluster.set(key, value,'EX', expiresIn);
        }
        else {
            result = await cluster.set(key, value);
        }

        if (result !== 'OK') {
            throw new Error('Redis::: set failed');
        }
    } catch (error) {
        throw error;
    }

    return true;
}

/**
 * get a value from the Redis client
 * @param {string} key 
 * @returns 
 */
const getRedisKey = async (key) => {
    try {
        return await cluster.get(key);
    } catch (error) {
        throw error;
    }
}

/**
 * delete a key from the Redis client
 * @param {string} key 
 */
const deleteRedisKey = async (key) => {
    try {
        await cluster.del(key);
    } catch (error) {
        throw error;
    }
}

/**
 * Delete a list of keys from the Redis client
 * @param {string} keys 
 */
const deleteRedisKeys = async (keys) => {
    try {
        for (let key of keys) {
            await cluster.del(key);
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Scan the Redis keys
 * @param {string} pattern 
 * @returns 
 */
const scanRedisKeys = async (pattern) => {
    try {
        let keys = [];
        const nodes = cluster.nodes('master');  // Lấy tất cả các master node trong cluster
        
        for (const node of nodes) {
            let cursor = '0';
            do {
                const [newCursor, foundKeys] = await node.scan(cursor, 'MATCH', pattern);
                cursor = newCursor;
                keys.push(...foundKeys);
            } while (cursor !== '0');
        }

        return keys;
    } catch (error) {
        throw error;
    }
}

export { setRedisKey, getRedisKey, deleteRedisKey, setRedisKeyOveride, scanRedisKeys, deleteRedisKeys }  // export the cluster and the connection handler