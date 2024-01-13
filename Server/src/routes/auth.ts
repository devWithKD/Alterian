import express, { Response, Request } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User, UserType } from "../model/user.model";
import { signAccessToken } from "../helpers/jwt-helpers";
import { GoogleProfileRequest } from "../interfaces";
const router = express.Router();

const SECRETKEY = process.env.SECRET_KEY || "";

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login/failed",
  }),
  async (req, res) => {
    const reqGoogle = req as GoogleProfileRequest;
    if (!reqGoogle.user) res.send("error");

    const user: UserType = {
      email: reqGoogle.user._json.email,
      password: undefined,
      firstName: reqGoogle.user._json.given_name,
      lastName: reqGoogle.user._json.family_name,
      provider: reqGoogle.user.provider,
      authID: reqGoogle.user.id,
    };

    const accessToken = await signAccessToken(user);

    res.cookie("jwt", accessToken);
    res.redirect('/');
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);



export default router;
