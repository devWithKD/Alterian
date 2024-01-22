import express from "express";
import {
  githubAuthController,
  googleOAuthController,
} from "../controller/auth.controller";
import { refreshToken } from "../controller/user.controller";
const router = express.Router();

router.post("/google", googleOAuthController);

router.post("/github", githubAuthController);

router.get("/refresh-token", refreshToken);

export default router;
