import { Request, Response, NextFunction } from "express";
import { UserType } from "../model/user.model";
import jwt, { Secret, VerifyErrors } from "jsonwebtoken";
import createHttpError from "http-errors";
const ACCESS_SECRET = process.env.ACCESS_SECRET as Secret;
const REFRESH_SECRET = process.env.REFRESH_SECRET as Secret;

export const verifyAccessToken = (req: any, res: any, next: NextFunction) => {
  if (!req.cookies.jwt) next(createHttpError.Unauthorized());
  const token = req.cookies.jwt;
  jwt.verify(token, ACCESS_SECRET, (err: VerifyErrors | null, payload: any) => {
    if (err) {
      err.name === "JsonWebTokenError"
        ? next(createHttpError.Unauthorized())
        : next(createHttpError.Unauthorized(err.message));
    }
    req.payload = payload;
    next()
  });
};

export const signAccessToken = (user: UserType) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: user },
      ACCESS_SECRET,
      { expiresIn: 60 * 1000 * 10 },
      (err, token) => {
        if (err) {
          console.log(err);
          return reject(createHttpError.InternalServerError());
        }
        resolve(token);
      }
    );
  });
};

export const signRefreshToken = (user: UserType) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: user,
      },
      REFRESH_SECRET,
      { expiresIn: "5d" },
      (err, token) => {
        if (err) return reject(createHttpError.InternalServerError());
        resolve(token);
      }
    );
  });
};
