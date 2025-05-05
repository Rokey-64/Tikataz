import { Router } from "express";
import mailRouter from "../api/mailsender/controllers/index.js";

const router = Router();

router.use("/mail-sender", mailRouter);

export default router;