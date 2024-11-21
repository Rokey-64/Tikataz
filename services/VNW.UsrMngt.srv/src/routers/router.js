import { Router } from "express";
import { getUser, createOTP, createRFJWT, createRAJWT, verifyOTP } from "../controllers/loginController.js";

const router = Router();


router.post('/login', getUser, createOTP, createRFJWT, createRAJWT, (req, res) => {
/**
 * This route handler expects a POST request body with the following structure:
 * 
 * {
 *   // Required fields
 *   id: <string> (Required) - The previous request ID.
 *   lang: <string> (Required) - The language of the user.
 *   loginName: <string> (Required) - The user login name of the user account.
 *   password: <string> (Required) - The password of the user.
 * }
 * 
 * Example request body:
 * 
 * {
 *   "id": "123456",
 *   "lang": 'vi',
 *   "loginName": "goldtime604@gmail.com",
 *   "password": "password123"
 * }
 */
    res.json(req.feedback);
});

router.post('/login/verify', verifyOTP, createRFJWT, createRAJWT, (req, res) => {
/**
 * This route handler expects a POST request body with the following structure:
 * 
 * {
 *   // Required fields
 *   id: <string> (Required) - The previous request ID.
 *   lang: <string> (Required) - The language of the user.
 *   otp: <string> (Required) - The OTP that the user received.
 * }
 * 
 * Example request body:
 * 
 * {
 *   "id": "123456",
 *   "lang": 'vi',
 *   "otp": "123456"
 * }
 */
    res.json(req.feedback);
});

export default router;