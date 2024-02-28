import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import api from "./routes/api";
import auth from "./routes/auth";
import { verifyAccessToken } from "./helpers/jwt-helpers";
import "./config/mongodb";
import cors from "cors";
import createHttpError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
   if (err.statusCode == 401) {
     res.clearCookie("access_token").clearCookie("refresh_token");
   }

  res.status(err.status).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

app.use("/auth", auth);

app.use("/api", verifyAccessToken, api);

app.get("/", (req: Request, res: Response, next) => {
  res.send("hi");
  next();
});

app.use((req: Request, res: Response, next) => {
  next(createHttpError.NotFound());
});

app.use(errorHandler);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
