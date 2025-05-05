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
import axios from "axios";

import "./src/databases/mongo.js"
import v1Router from "./src/routers/v1/root.js";

const app = express();
app.set('trust proxy', ['loopback', '127.0.0.1']); // trust first proxy
const serviceID = process.env.SERVICE_ID;

// Initialize the CORS middleware for handling cross-origin requests
app.use(cors(
    {
        origin: [
            'http://localhost:3000',
            'http://tikataz.vn',
            'http://atlas.tikataz.vn',
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
    req.userID = "dkebsheu1sed55a8wwd5+";
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
 * * Check login status of user
 */
app.use(async (req, res, next) => {
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;
    const accessToken = cookies.accessToken;

    const generateNewAC = async () => {
        // Generate new access token
        try {
            const response = await axios.post(`http://accounts-api.tikataz.vn/api/v1/accounts/auths/refresh`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': req.headers.cookie
                },
                withCredentials: true
            })

            /**
             * Forward cookies from the response to the client
             * This is important to ensure that the client receives the new cookies set by the server.
             */
            const setCookieHeader = response.headers['set-cookie'];
            if (setCookieHeader) {
                res.setHeader('Set-Cookie', setCookieHeader);
            }

            req.isUserLoggedIn = true;
        }
        catch (err) {
            console.log("Error when generating new access token: ", err);
            req.isUserLoggedIn = false;
        }
    }

    if (!refreshToken && !accessToken) {
        req.isUserLoggedIn = false;
    }
    else {
        await generateNewAC();
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

app.use('/', (req, res) => {
    res.status(200).json({ message: "Test route is working!" });
});

const PORT = 3160;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});