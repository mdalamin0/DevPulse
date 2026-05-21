import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {Pool} from "pg";
import config from "./config/env.config";
import { userRouter } from "./modules/user/user.route";

export const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Server is successfully running" });
});


app.use("/api/auth", userRouter);

