import { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model";
import createHttpError from "http-errors";

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
