import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import {v4 as uuidv4 } from 'uuid';
import { now } from "sequelize/lib/utils";
import {cluster} from './src/databases/redis-jack.js';
// import i18nInit from './src/locales/i18n.js';
import i18nextMiddleware from 'i18next-express-middleware';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import "./src/databases/mongo.js"
import tagRouter from "./src/api/tab/tabControler.js";


const app = express();
const serviceID = process.env.SERVICE_ID;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());
app.use(xssClean());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Initialize the CORS middleware for handling cross-origin requests
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'cross-origin-embedder-policy'],
        credentials: true
    }
));

// Initialize the session middleware for handling sessions and cookies
const sessionOptions = {
    store: new RedisStore({client: cluster, ttl: 240}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));

// Initialize i18next and i18next middleware for handling translations
// app.use(i18nextMiddleware.handle(i18nInit));

app.use((req, res, next) => {
    req.id = uuidv4();
    next();
});

app.use((req, res, next) => {
    req.feedback = {
        requestID: req.id,
        serviceID: serviceID,
        status: 'Unknown',
        message: null,
        data: {},
        timestamp: now()
    }
    next();
});

app.use('/', tagRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});