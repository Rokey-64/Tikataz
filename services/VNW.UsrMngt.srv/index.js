import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import passport from 'passport';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { now } from "sequelize/lib/utils";
import i18nextMiddleware from 'i18next-express-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { showMessage } from "#@/services/fluentd-connection/fluentd-jack.js";
import { cluster } from './src/services/db-connection/redis-jack.js';
import i18nInit from './src/locales/i18n.js';
import v1Router from './src/routes/v1root.js';
import './src/services/db-connection/mysql-jack.js';
import './src/services/fluentd-connection/fluentd-jack.js';
import './src/config/google-auths.js';
import helmet from 'helmet';
import xssClean from 'xss-clean';
//import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import { verifyJWT } from '#@/services/token-auths/index.js';
import jwt from "jsonwebtoken";


const app = express();
const serviceID = process.env.SERVICE_ID;


app.use(express.json());
// app.set('trust proxy', ['loopback', '127.0.0.1']); // trust first proxy
app.set('trust proxy', 'loopback');
app.use(cookieParser());
app.use(express.json({ limit: '0.1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(xssClean());
//app.use(mongoSanitize());
app.use(hpp());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Initialize the CORS middleware for handling cross-origin requests
app.use(cors(
    {
        origin: [
            'http://localhost:3001',
            'http://accounts.tikataz.vn',
            'http://atlas.tikataz.vn',
            'https://tikataz.vn',
            'http://atlas-api.tikataz.vn',

            'https://accounts.tikataz.com',
            'https://atlas.tikataz.com',
            'https://tikataz.com',
            'https://atlas-api.tikataz.com',
        ],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'cross-origin-embedder-policy'],
        credentials: true
    }
));

// Initialize the session middleware for handling sessions and cookies
const sessionOptions = {
    store: new RedisStore({ client: cluster, ttl: 240 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));
app.use(passport.initialize());

// Initialize i18next and i18next middleware for handling translations
app.use(i18nextMiddleware.handle(i18nInit));


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

app.use("/api/v1/accounts", v1Router);

app.use("/", (req, res) => {

    return res.status(200).json("Connected to the server");
});

const port = process.env.USER_PORT;
const listener = app.listen(port, '0.0.0.0', () => {
    console.log('server is running on the port ' + listener.address().port)
});

