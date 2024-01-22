import { Request, Response, NextFunction } from "express";
import jwt, { Secret, VerifyErrors } from "jsonwebtoken";
import createHttpError from "http-errors";
const ACCESS_SECRET = process.env.ACCESS_SECRET as Secret;
const REFRESH_SECRET = process.env.REFRESH_SECRET as Secret;

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.access_token) next(createHttpError.Unauthorized());
  const token = req.cookies.access_token;
  jwt.verify(token, ACCESS_SECRET, (err: VerifyErrors | null, payload: any) => {
    if (err) {
      err.name === "JsonWebTokenError"
        ? next(createHttpError.Unauthorized())
        : next(createHttpError.Unauthorized(err.message));
    }
    req.tokenPayload = payload;
    next();
  });
};

export const signAccessToken = (userID: string, expires: number|string) => {
  return new Promise((resolve, reject) => {
    
    jwt.sign(
      { data: userID },
      ACCESS_SECRET,
      { expiresIn: expires },
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

export const signRefreshToken = (userID: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: userID,
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
