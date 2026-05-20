import express, {
  type Application,
  type Request,
  type Response,
} from "express";

export const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Server is successfully running" });
});
