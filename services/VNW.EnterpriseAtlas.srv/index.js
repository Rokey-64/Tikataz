import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import { v4 as uuidv4 } from 'uuid';
import { now } from "sequelize/lib/utils";
import { cluster } from './src/databases/redis-jack.js';
import './src/databases/mysql-jack.js';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import "./src/databases/mongo.js"
import v1Router from "./src/routers/v1/root.js";

const app = express();
app.set('trust proxy', "loopback"); // trust first proxy
const serviceID = process.env.SERVICE_ID;

// Initialize the CORS middleware for handling cross-origin requests
app.use(cors(
    {
        origin: [
            'http://localhost:3000',
            'http://tikataz.vn',
            'http://atlas.tikataz.vn',
            'https://accounts-apis.tikataz.vn',

            'http://tikataz.com',
            'http://atlas.tikataz.com',
            'https://accounts-api.tikataz.com',
        ],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: ['Content-Type', 'Authorization', 'cross-origin-embedder-policy'],
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(xssClean());
app.use(hpp());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Initialize the session middleware for handling sessions and cookies
const sessionOptions = {
    store: new RedisStore({ client: cluster, ttl: 480 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 8,
        sameSite: 'lax',
        path: '/',
        // domain: 'localhost'
    }
};
app.use(session(sessionOptions));

// Initialize i18next and i18next middleware for handling translations
// app.use(i18nextMiddleware.handle(i18nInit));

app.use((req, res, next) => {
    req.id = uuidv4();
    req.userID = "";
    req.isUserLoggedIn = false;

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




/**
 * initialize the root router for handling all routes
 * 
 * This router is the main entry point for all routes in the application related to the `home` service.
 * It is mounted at the path `/api/v1/home`.
 *
 * Example routes:
 * - GET /api/home/public
 * - POST /api/home/auth/data
 */
app.use('/api/v1/home', v1Router);

// app.use('/', (req, res) => {
//     res.status(200).json({ message: "Test route is working!" });
// });

const PORT = process.env.SERVICE_PORT;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});