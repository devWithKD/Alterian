import { Request, Response, NextFunction } from "express";
import {
  getGithubUser,
  getGoogleUser,
  getTokenGithub,
  getTokenGoogle,
  findOneOrCreateUser,
  checkExistingUserByEmail,
} from "../services/user.services";
import { User } from "../model/user.model";
import {
  invalidateRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../helpers/jwt-helpers";
import createHttpError from "http-errors";
import { accessCookieOps, refreshCookieOps } from "../helpers/cookie-helpers";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

// Export a function called googleOAuthController which takes in a request, response and nextFunction as parameters
export const googleOAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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

export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);
  const result = await checkExistingUserByEmail(req.body.email);
  if (result) res.sendStatus(200);
  else res.status(404).send("User does not exist");
};

export const signUpWithEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.email)
    next(createHttpError.BadRequest("Credentials not found!"));
  const data = req.body;

  const user = await User.findOne({ email: data.email });
  if (user) {
    next(
      createHttpError.BadRequest("User with same email address alredy exists"),
    );
    return;
  } else {
    const authId = uuid();
    const hashedPass = await bcrypt.hash(data.password, 11);
    const newUser = new User({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      authID: authId,
      password: hashedPass,
      provider: "emailAuth",
    });
    const savedUser = await newUser.save();

    const accessToken = await signAccessToken(savedUser.id, "5h");
    // Sign the refresh token from the signRefreshToken function
    const refreshToken = await signRefreshToken(savedUser.id);
    // Set the access token and refresh token in the response cookies with the accessCookieOps and refreshCookieOps
    res.cookie("access_token", accessToken, accessCookieOps);
    res.cookie("refresh_token", refreshToken, refreshCookieOps);
    // Return a json object containing the user's email, first name, last name, provider and id
    res.json({
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      provider: savedUser.provider,
      id: savedUser.id,
    });
  }
};

export const loginWithEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.email)
    next(createHttpError.BadRequest("Credentials not found!"));
  const data = req.body;
  const user = await User.findOne({ email: data.email, provider: "emailAuth" });
  if (!user) {
    next(createHttpError.NotFound("Invalid Credentials"));
    return;
  }
  const hasMatch = await user.hasValidPass(data.password);
  if (!hasMatch) {
    next(createHttpError.NotFound("Invalid Credentials"));
    return;
  }
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

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.cookies.refresh_token) next(createHttpError.Unauthorized());
  const token = req.cookies.refresh_token;
  invalidateRefreshToken(token)
    .then(() => {
      res.clearCookie("access_token").clearCookie("refresh_token");
      res.send(200)
    })
    .catch((err) => next(err));
};
