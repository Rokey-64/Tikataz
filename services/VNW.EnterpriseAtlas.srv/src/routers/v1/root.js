/**
 * Router chính cho ứng dụng.
 * 
 * File này chứa các route gốc của ứng dụng, phân chia thành 2 nhóm:
 * 1. `/public`: Các route không yêu cầu xác thực, ví dụ như đăng nhập, đăng ký, xem dữ liệu công khai.
 * 2. `/auth`: Các route yêu cầu xác thực người dùng, ví dụ như thay đổi mật khẩu, xem hồ sơ cá nhân.
 * 
 * Việc phân chia này giúp mã nguồn trở nên dễ hiểu và bảo trì hơn.
 */

import { Router } from "express";
import publicRouter from "./non-auths.js";
import authRouter from "./auths.js";
import { showMessage } from "#@/databases/http_fluentd.js";
import axios from "axios";
import getModelService from "#@/services/getModelService.js";
import { cluster } from '#@/databases/redis-jack.js';

const router = Router();

/**
 * * Check login status of user
 */
router.use(async (req, res, next) => {
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;

    const model = getModelService(req);
    const side = model.s;

    // Rendering at server side, cookies are not available, pass the request to the next middleware
    if (side === "ssr") {
        req.isUserLoggedIn = false;
        return next();
    }

    const generateNewAC = async () => {
        // Generate new access token
        try {
            const response = await axios.post(process.env.RF_TOKEN_URL, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': req.headers.cookie
                },
                withCredentials: true
            })

            const uid = response.data?.uid;
            if (!uid) {
                req.isUserLoggedIn = false;
                return;
            }

            req.userID = uid;

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
            showMessage("error", "Error when generating new access token: ", err.response?.data, err.response?.status);
            req.isUserLoggedIn = false;
        }
    }

    if (!refreshToken) {
        req.isUserLoggedIn = false;
    }
    else {
        await generateNewAC();
    }

    return next();
});

/**
 * Tracking user visits
 */
router.use(async (req, res, next) => {
    const cookies = req.cookies;
    const acclogs = cookies.acclogs;

    const model = getModelService(req);
    const side = model.s;

    // Rendering at server side, cookies are not available, pass the request to the next middleware
    if (side === "ssr") {
        return next();
    }

    if (!acclogs) {
        await cluster.incr("atlas_tracking").catch((err) => {
            showMessage("error", "Error when tracking user visits: ", err);
        });

        res.cookie('acclogs', req.id, {
            maxAge: 1000 * 60 * 60 * 24, // 24h
            secure: false,
            httpOnly: false,
            sameSite: 'lax',
            domain: process.env.COOKIE_DOMAIN,
        });
    }

    return next();
});

const auths = (req, res, next) => {
    const isUserLoggedIn = req.isUserLoggedIn;
    if (!isUserLoggedIn) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
};

router.use("/public", publicRouter);
router.use("/auths", auths, authRouter);
router.use("/", auths, (req, res) => {
    res.status(200).json({ message: "Authenticated route" });
});

export default router;
