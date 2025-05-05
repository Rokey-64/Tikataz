import { Router } from "express";
import signupRouter from '#@/api/accounts/controllers/registerController.js';
import confirmRouter from '#@/api/accounts/controllers/registerConfirmController.js';
import loginRouter from '#@/api/accounts/controllers/loginController.js';
import resetPasswordRouter from '#@/api/accounts/controllers/resetPasswordController.js';
import confirmToken from '#@/api/accounts/controllers/confirmToken.js';
import updatePasswordRouter from '#@/api/accounts/controllers/updatePasswordController.js';
import authsController from '#@/api/accounts/controllers/authsController.js';
import googleLoginController from '#@/api/accounts/controllers/googleLoginController.js';

const router = Router();

router.use('/signup', signupRouter);
router.use('/confirm', confirmRouter);
router.use('/login', loginRouter);
router.use('/rs', resetPasswordRouter);
router.use('/confirm-token', confirmToken);
router.use('/update-password', updatePasswordRouter);
router.use('/auths', authsController);
router.use('/google', googleLoginController);

export default router;