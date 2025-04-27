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

import "./src/databases/mongo.js"
// import atlasRouter from "./src/api/atlas/controllers/index.js";
// import nationRouter from "./src/api/nation_category/nationCategoryController.js";
// import timezonesRouter from "./src/api/timezone_category/timezoneController.js";
// import languagesRouter from "./src/api/languages_category/languageCategoryController.js";
// import profileRouter from "./src/api/company_profile/controllers/profileController.js";
// import branchesRouter from "./src/api/company_branches/controllers/branchController.js";
// import leadersRouter from "./src/api/company_leaders/controllers/leadersController.js";
// import settingsRouter from "./src/api/settings/controllers/settings.js";
// import feedbackRouter from "./src/api/feedback/controllers/feedback.js";
// import cardsRouter from "./src/api/studio_cards/controllers/index.js";
// import custRFQRouter from "./src/api/rfq_customer/controllers/index.js";
// import supplierRFQRouter from "./src/api/rfq_supliers/controllers/index.js";
 
let atlasRouter, nationRouter, timezonesRouter, languagesRouter;
let profileRouter, branchesRouter, leadersRouter, settingsRouter;
let feedbackRouter, cardsRouter, custRFQRouter, supplierRFQRouter;

try {
  atlasRouter = await import("./src/api/atlas/controllers/index.js").then(m => m.default);
  nationRouter = await import("./src/api/nation_category/nationCategoryController.js").then(m => m.default);
  timezonesRouter = await import("./src/api/timezone_category/timezoneController.js").then(m => m.default);
  languagesRouter = await import("./src/api/languages_category/languageCategoryController.js").then(m => m.default);
  profileRouter = await import("./src/api/company_profile/controllers/profileController.js").then(m => m.default);
  branchesRouter = await import("./src/api/company_branches/controllers/branchController.js").then(m => m.default);
  leadersRouter = await import("./src/api/company_leaders/controllers/leadersController.js").then(m => m.default);
  settingsRouter = await import("./src/api/settings/controllers/settings.js").then(m => m.default);
  feedbackRouter = await import("./src/api/feedback/controllers/feedback.js").then(m => m.default);
  cardsRouter = await import("./src/api/studio_cards/controllers/index.js").then(m => m.default);
  custRFQRouter = await import("./src/api/rfq_customer/controllers/index.js").then(m => m.default);
  supplierRFQRouter = await import("./src/api/rfq_supliers/controllers/index.js").then(m => m.default);
} catch (err) {
  console.error("🚨 Lỗi khi import route:", err);
  process.exit(1); // Dừng chương trình nếu có lỗi import
}

const app = express();
const serviceID = process.env.SERVICE_ID;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(xssClean());
app.use(hpp());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Initialize the CORS middleware for handling cross-origin requests
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://172.21.176.1:3000'],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: ['Content-Type', 'Authorization', 'cross-origin-embedder-policy'],
        credentials: true
    }
));

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

app.use('/', atlasRouter);
app.use('/', nationRouter);
app.use('/', timezonesRouter);
app.use('/', languagesRouter);
app.use('/', profileRouter);
app.use('/', branchesRouter);
app.use('/', leadersRouter);
app.use('/', settingsRouter);
app.use('/', feedbackRouter);
app.use('/', cardsRouter);
app.use('/', custRFQRouter);
app.use('/', supplierRFQRouter);

const PORT = 3160;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});