// import type { JwtPayload } from "jsonwebtoken";
import type { JwtUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
