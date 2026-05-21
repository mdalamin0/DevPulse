import { Router, type Request, type Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueController } from "./issue.controller";

const router = Router();

router.post("/", issueController.createIssue)

export const issueRoter = router;