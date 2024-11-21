'use strict';
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import sender from "./src/controllers/sender/index.js";
import { cluster } from './src/db/redis.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
    store: new connectRedis({ client: cluster, ttl: 120 }),
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use((req, res, next) => {
    req.id = uuidv4();
    next();
});
app.use((req, res, next) => {
    req.feedback = {
        requestID: req.id,
        status: 'Unknown',
        message: null,
        data: {},
        error: {},
        timestamp: Date.now()
    };
    next();
});
app.use('/', sender);
app.use('/', (req, res, next) => {
    return res.json(req.feedback);
});
const port = process.env.PORT || 5001;
const listener = app.listen(port, () => {
    const address = listener.address();
    if (address && typeof address !== 'string') {
        console.log(`Server is running on ${address.port}`);
    }
});
