import { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model";
import createHttpError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt-helpers";
import { accessCookieOps, refreshCookieOps } from "../helpers/cookie-helpers";

export const userinfoV1 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.tokenPayload.data;

  const reqUser = await User.findById(userID);

  if (!reqUser) {
    next(createHttpError.Unauthorized());
    return;
  }

  res.json({
    email: reqUser.email,
    firstName: reqUser.firstName,
    lastName: reqUser.lastName,
    provider: reqUser.provider,
    id: reqUser.id,
  });
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.refresh_token)
      next(createHttpError.BadRequest("Refresh Token Not Found"));
    const token = req.cookies.refresh_token;
    // console.log(token);
    const userID = await verifyRefreshToken(token);
    // if (!userID) next(createHttpError.Unauthorized("UserId not Found"));
    const accessToken = await signAccessToken(userID, "5h");
    const refreshToken = await signRefreshToken(userID);
    res
      .cookie("access_token", accessToken, accessCookieOps)
      .cookie("refresh_token", refreshToken, refreshCookieOps)
      .sendStatus(200);
  } catch (error: any) {
    next(createHttpError.Unauthorized(error.message));
  }
};
