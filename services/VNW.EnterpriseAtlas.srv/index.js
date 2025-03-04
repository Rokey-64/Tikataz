import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import {v4 as uuidv4 } from 'uuid';
import { now } from "sequelize/lib/utils";
import multer from "multer";
import {cluster} from './src/databases/redis-jack.js';
import './src/databases/mysql-jack.js';
// import i18nInit from './src/locales/i18n.js';
import i18nextMiddleware from 'i18next-express-middleware';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import "./src/databases/mongo.js"
import tagRouter from "./src/api/atlas/tabControler.js";
import azureContainer from "./src/api/azure_storage/azure_connector.js";
import nationRouter from "./src/api/nation_category/nationCategoryController.js";
import timezonesRouter from "./src/api/timezone_category/timezoneController.js";
import languagesRouter from "./src/api/languages_category/languageCategoryController.js";
import profileRouter from "./src/api/company_profile/controllers/profileController.js";
import branchesRouter from "./src/api/company_branches/controllers/branchController.js";
import leadersRouter from "./src/api/company_leaders/controllers/leadersController.js";
import settingsRouter from "./src/api/settings/controllers/settings.js";
import feedbackRouter from "./src/api/feedback/controllers/feedback.js";
import cardsRouter from "./src/api/cards/controllers/index.js";


const app = express();
app.use(cors());
const serviceID = process.env.SERVICE_ID;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());
app.use(xssClean());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200 // limit each IP to 100 requests per windowMs
});

app.use(limiter);


// Initialize the CORS middleware for handling cross-origin requests
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://192.168.1.7:3000/'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'cross-origin-embedder-policy'],
        credentials: true
    }
));

// Initialize the session middleware for handling sessions and cookies
const sessionOptions = {
    store: new RedisStore({client: cluster, ttl: 480}),
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
app.use('/', azureContainer);
app.use('/', nationRouter);
app.use('/', timezonesRouter);
app.use('/', languagesRouter);
app.use('/', profileRouter);
app.use('/', branchesRouter);
app.use('/', leadersRouter);
app.use('/', settingsRouter);
app.use('/', feedbackRouter);
app.use('/', cardsRouter);


const PORT = 3160;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});