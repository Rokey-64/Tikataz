import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";
import googleUserAuths from "#@/api/accounts/middlewares/googleUserAuths.js";
import googleCreateUser from "#@/api/accounts/middlewares/googleCreateUser.js";
import createRefreshToken from "../middlewares/createRefreshToken.js";
import createAccessToken from "../middlewares/createAccessToken.js";
import setCookies from "../middlewares/setCookies.js";

const router = Router();

router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false, prompt: 'select_account' }),
);

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleUserAuths,
    googleCreateUser,
    createRefreshToken,
    createAccessToken,
    setCookies,
    (req, res) => {
        res.status(200).json(setFeedback(req.feedback, true, 'Login success'));
    }
);

export default router;
