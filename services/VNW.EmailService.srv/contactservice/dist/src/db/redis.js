'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import redis from 'ioredis';
import 'dotenv/config';
import url from 'url';
import dbc from './dbc.json' assert { type: "json" };
import emitLog, { level, showMessage } from '../logs/index.js';
import { assert } from 'console';
const TIME_OUT = 15000;
const env = process.env.NODE_ENV || 'development';
const dialect = 'redis';
let conf = { host: '', port: 0 };
let setReconnectTimeout = null;
/**
|--------------------------------------------------
| read dbc file and create cluster configuration
|--------------------------------------------------
*/
const initializeConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = dbc;
    const redisDB = db[dialect];
    if (!redisDB)
        throw new Error('No redis configuration found | 00');
    const redisNode = redisDB[env];
    if (!redisNode)
        throw new Error('No redis configuration found | 00');
    for (let key in redisNode) {
        let item = redisNode[key];
        if (!item)
            throw new Error('No redis configuration found | 00');
        conf.port = new url.URL(item).port ? parseInt(new url.URL(item).port) : 6379;
        conf.host = new url.URL(item).hostname;
    }
});
initializeConfig();
/**
|--------------------------------------------------
| Create a Redis cluster with user name is root and pass is ********
|--------------------------------------------------
*/
export const cluster = new redis.Cluster([conf], {
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
const handleRedisState = () => {
    cluster.on('error', (err) => __awaiter(void 0, void 0, void 0, function* () {
        yield emitLog(level.DB_ERROR, null, `Redis | An error occured | ${err}`, 'src/database/redis-jack', null);
    }));
    cluster.on('ready', () => {
        showMessage('Redis::: Ready');
    });
    cluster.on('reconnecting', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!setReconnectTimeout) {
            setReconnectTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield emitLog(level.DB_ERROR, null, `Redis::: Disconnected | TIME_OUT`, 'src/database/redis-jack', null);
                cluster.quit();
            }), TIME_OUT);
        }
    }));
};
/**
 * inport a key value pair to the Redis client
 * @param {*} key
 * @param {*} value
 * @param {*} expiresIn - the time to live for the key in seconds
 */
const setRedisKey = (key, value, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cluster.set(key, value, 'EX', expiresIn, 'NX');
        if (result !== 'OK') {
            throw new Error('Redis::: set failed');
        }
    }
    catch (error) {
        throw error;
    }
    return true;
});
/**
 * inport a key value pair to the Redis client
 * @param {*} key
 * @param {*} value
 * @param {*} expiresIn - the time to live for the key in seconds
 */
const setRedisKeyOveride = (key, value, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        if (expiresIn) {
            result = yield cluster.set(key, value, 'EX', expiresIn);
        }
        else {
            result = yield cluster.set(key, value);
        }
        if (result !== 'OK') {
            throw new Error('Redis::: set failed');
        }
    }
    catch (error) {
        throw error;
    }
    return true;
});
/**
 * get a value from the Redis client
 * @param {*} key
 * @returns
 */
const getRedisKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cluster.get(key);
    }
    catch (error) {
        throw error;
    }
});
/**
 * delete a key from the Redis client
 * @param {*} key
 */
const deleteRedisKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cluster.del(key);
    }
    catch (error) {
        throw error;
    }
});
export { setRedisKey, getRedisKey, deleteRedisKey, setRedisKeyOveride }; // export the cluster and the connection handler
