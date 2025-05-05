import { Router } from 'express';
import sendEmail from '../middlewares/sendEmail.js';

const router = Router();

router.post('/', sendEmail, async (req, res) => {
    return res.status(200).json({});
})

export default router;