import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {Pool} from "pg";
import config from "./config/env.config";
import { userRouter } from "./modules/auth/auth.route";
import { issueRoter } from "./modules/issue/issue.route";

export const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Server is successfully running" });
});


app.use("/api/auth", userRouter);
app.use("/api/issues", issueRoter);

// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log the error

//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

