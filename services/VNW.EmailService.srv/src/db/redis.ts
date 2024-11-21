'use strict'

import redis, { ClusterNode } from 'ioredis';
import 'dotenv/config';
import url from 'url';
import dbc from './dbc.json';
import emitLog, { level, showMessage } from '../logs/index.js';

const TIME_OUT = 15000;
const env = process.env.NODE_ENV || 'development';
const dialect:string = 'redis';
let conf:ClusterNode = { host: '', port: 0 };
let setReconnectTimeout:NodeJS.Timeout | null = null;


/**
|--------------------------------------------------
| read dbc file and create cluster configuration
|--------------------------------------------------
*/
const initializeConfig  = async () => {
    const db:DatabaseConfig  = dbc as DatabaseConfig;
    const redisDB = db[dialect];
    if (!redisDB) throw new Error('No redis configuration found | 00');
    
    const redisNode = redisDB[env];
    if (!redisNode) throw new Error('No redis configuration found | 00');

    for (let key in redisNode) {
        let item = redisNode[key];
        if (!item) throw new Error('No redis configuration found | 00');

        conf.port = new url.URL(item).port ? parseInt(new url.URL(item).port) : 6379;
        conf.host = new url.URL(item).hostname;
    }
};
initializeConfig ();

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
}

/**
 * inport a key value pair to the Redis client
 * @param {*} key 
 * @param {*} value 
 * @param {*} expiresIn - the time to live for the key in seconds
 */
const setRedisKey = async (key:string, value:any, expiresIn:number) => {
    try {
        const result = await cluster.set(key, value, 'EX', expiresIn,'NX');
        if (result !== 'OK') {
            throw new Error('Redis::: set failed');
        }
    } catch (error) {
        throw error;
    }

    return true;
}

/**
 * inport a key value pair to the Redis client
 * @param {*} key 
 * @param {*} value 
 * @param {*} expiresIn - the time to live for the key in seconds
 */
const setRedisKeyOveride = async (key:string, value:any, expiresIn:number) => {
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
 * @param {*} key 
 * @returns 
 */
const getRedisKey = async (key:string) => {
    try {
        return await cluster.get(key);
    } catch (error) {
        throw error;
    }
}

/**
 * delete a key from the Redis client
 * @param {*} key 
 */
const deleteRedisKey = async (key:string) => {
    try {
        await cluster.del(key);
    } catch (error) {
        throw error;
    }
}

export { setRedisKey, getRedisKey, deleteRedisKey, setRedisKeyOveride }  // export the cluster and the connection handler