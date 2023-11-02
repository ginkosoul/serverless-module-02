import express from "express";
import cors from "cors";
import { HttpError } from "./utils/HttpError.js";
import authRouter from "./routes/api/auth.js";
import currentUserRouter from "./routes/api/me.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/me", currentUserRouter);

app.use((req, res, next) => {
  next(HttpError());
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
