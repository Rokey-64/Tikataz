import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import 'dotenv/config';
import {v4 as uuidv4 } from 'uuid';
import { now } from "sequelize/lib/utils";
import {cluster} from './src/services/db-connection/redis-jack.js';
import i18nInit from './src/locales/i18n.js';
import i18nextMiddleware from 'i18next-express-middleware';
import cors from 'cors';

import helmet from 'helmet';
import xssClean from 'xss-clean';
//import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import './src/services/db-connection/mysql-jack.js';
import './src/services/fluentd-connection/fluentd-jack.js';
import signupRouter from './src/controllers/registerController.js';
import confirmRouter from './src/controllers/registerConfirmController.js';
import loginRouter from './src/controllers/loginController.js';
import resetPasswordRouter from './src/controllers/resetPasswordController.js';
import confirmToken from './src/controllers/confirmToken.js';
import updatePasswordRouter from './src/controllers/updatePasswordController.js';
 
const app = express();
const serviceID = process.env.SERVICE_ID;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());
app.use(xssClean());
//app.use(mongoSanitize());
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

/**
 * User sends a registration request containing their infomation to the server
 */
app.use('/',signupRouter);

/**
 * User confirms by clicking the link in their email to finish the registration process
 */
app.use('/',confirmRouter);

/**
 * User sends a login request containing their infomation to the server
 */
app.use('/',loginRouter)

/**
 * User sends a request to reset their password
 */
app.use('/',resetPasswordRouter);

/**
 * User sends a request to confirm their token
 */
app.use('/',confirmToken);

/**
 * User sends a request to reset their password
 */
app.use('/', (req, res) => {
    console.log('Request ID: ', req.id);
    return res.send('Tikataz User Management APIs');
});

const port =  process.env.PORT;
const listener = app.listen(port, ()=>{
    console.log('server is running on the port '+ listener.address().port)
});
