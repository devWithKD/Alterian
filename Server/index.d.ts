import { Express } from "express-serve-static-core";

interface TokenPayload {
  data: string,
  iat: number,
  exp: number
}

declare module "express-serve-static-core" {
  interface Request {
    tokenPayload: TokenPayload
  }
}