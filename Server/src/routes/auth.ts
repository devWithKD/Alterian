import express from "express";
import { githubAuthController, googleOAuthController } from "../controller/auth.controller";
const router = express.Router();

router.post("/google", googleOAuthController);

router.post('/github', githubAuthController)

export default router;
