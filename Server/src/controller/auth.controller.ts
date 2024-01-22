import { Request, Response, NextFunction } from "express";
import {
  getGithubUser,
  getGoogleUser,
  getTokenGithub,
  getTokenGoogle,
} from "../services/user.services";
import { signAccessToken, signRefreshToken } from "../helpers/jwt-helpers";
import createHttpError from "http-errors";
import { findOneOrCreateUser } from "../services/user.services";
import { accessCookieOps, refreshCookieOps } from "../helpers/cookie-helpers";

// Export a function called googleOAuthController which takes in a request, response and nextFunction as parameters
export const googleOAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the request body does not contain a code, log an error and call the next function with a BadRequest error
  if (!req.body.code) {
    console.log("code not found");
    next(createHttpError.BadRequest());
  }
  // Decode the code from the request body
  const code = decodeURIComponent(req.body.code);
  // Get the id_token and access_token from the getTokenGoogle function
  const { id_token, access_token } = await getTokenGoogle(code);
  // Get the google user from the getGoogleUser function
  const googleUser = await getGoogleUser({ id_token, access_token });
  // If the user's email is not verified, return a 403 error
  if (!googleUser.verified_email) {
    return res.status(403).send("Google account is not verified");
  }
  // Find or create the user from the findOneOrCreateUser function
  const user = await findOneOrCreateUser(googleUser, "google");
  // Sign the access token from the signAccessToken function
  const accessToken = await signAccessToken(user.id, "5h");
  // Sign the refresh token from the signRefreshToken function
  const refreshToken = await signRefreshToken(user.id);
  // Set the access token and refresh token in the response cookies with the accessCookieOps and refreshCookieOps
  res.cookie("access_token", accessToken, accessCookieOps);
  res.cookie("refresh_token", refreshToken, refreshCookieOps);
  // Return a json object containing the user's email, first name, last name, provider and id
  res.json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: user.provider,
    id: user.id,
  });
};

// Export a function called githubAuthController which takes in a request, response and nextFunction as parameters
export const githubAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the request body does not contain a code, log an error and call the next function with a BadRequest error
  if (!req.body.code) {
    console.log("code not found");
    next(createHttpError.BadRequest());
  }
  // Decode the code from the request body
  const code = decodeURIComponent(req.body.code);
  // Get the token from the getTokenGithub function
  const token = await getTokenGithub(code);
  // Get the github user from the getGithubUser function
  const githubUser = await getGithubUser(token);
  // If the user's email is not verified, return a 403 error
  if (!githubUser.verified_email) {
    return res.status(403).send("Email is not verified");
  }
  // Find or create the user from the findOneOrCreateUser function
  const user = await findOneOrCreateUser(githubUser, "github");
  // Sign the access token from the signAccessToken function
  const accessToken = await signAccessToken(user.id, "5h");
  // Sign the refresh token from the signRefreshToken function
  const refreshToken = await signRefreshToken(user.id);
  // Set the access token and refresh token in the response cookies with the accessCookieOps and refreshCookieOps
  res.cookie("access_token", accessToken, accessCookieOps);
  res.cookie("refresh_token", refreshToken, refreshCookieOps);
  // Return a json object containing the user's email, first name, last name, provider and id
  res.json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: user.provider,
    id: user.id,
  });
};