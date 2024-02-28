import express from "express";
import {
  githubAuthController,
  googleOAuthController,
  checkEmail,
  loginWithEmail,
  signUpWithEmail,
  logOut,
} from "../controller/auth.controller";
import { refreshToken } from "../controller/user.controller";
const router = express.Router();

router.post("/google", googleOAuthController);

router.post("/github", githubAuthController);

router.get("/refresh-token", refreshToken);

router.post("/check-email", checkEmail);

router.post("/email/login", loginWithEmail);

router.post("/email/signup", signUpWithEmail);

router.get("/logout", logOut);

export default router;
