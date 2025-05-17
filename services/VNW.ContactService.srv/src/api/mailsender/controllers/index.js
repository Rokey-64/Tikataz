import { Router } from 'express';
import sendEmail from '../middlewares/sendEmail.js';

const router = Router();

router.get('/', sendEmail, async (req, res) => {
    return res.status(200).json({});
})

export default router;