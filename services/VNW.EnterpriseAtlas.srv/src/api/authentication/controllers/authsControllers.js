import { Router } from "express";

const router = Router();

router.get("/vmw/auths/new", (req, res) => {
    res.status(200).json({message: "Auths route"});
});

router.get("/vmw/auths/confirm", (req, res) => {
    res.status(200).json({message: "Auths route"});
});

export default router;