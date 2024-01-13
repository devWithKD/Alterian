// import https from "https";
import "dotenv/config";
import express, { Request, Response } from "express";
import api from "./routes/api";
import auth from "./routes/auth";
import { verifyAccessToken } from "./helpers/jwt-helpers";
import passport from "passport";
import "./config/database";
import "./config/passport";
import cookieParser from 'cookie-parser'




const app = express();
app.use(express.json())
app.use(cookieParser())
app.get("/", (req: Request, res: Response) => {
  console.log(req.user);
  res.send("hi");
});

app.use(passport.initialize());

app.use("/auth", auth);

app.use("/api", verifyAccessToken, api);

app.use((req: Request, res: Response) => {
  res.send("not found");
});
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
