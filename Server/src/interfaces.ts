import { Request } from "express";
import passportGoogle from 'passport-google-oauth20'

export interface GoogleProfileRequest extends Request{
  user: passportGoogle.Profile
}