import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/auth/auth.route";
import { issueRoter } from "./modules/issue/issue.route";
import globalErrorHanlder from "./middleware/globalErrorHanlder";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Server is successfully running" });
});


app.use("/api/auth", userRouter);
app.use("/api/issues", issueRoter);

app.use(globalErrorHanlder);

export default app;
