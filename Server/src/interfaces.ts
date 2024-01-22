import { Request } from "express";
import passportGoogle from 'passport-google-oauth20'
import passportGithub from 'passport-github2'

export interface GoogleProfileRequest extends Request{
  user: passportGoogle.Profile
}

export interface GithubProfileRequest extends Request{
  user: passportGithub.Profile
}