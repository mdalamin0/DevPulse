import { Router, type Request, type Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth("contributor", "maintainer"), issueController.createIssue);
router.get("/", issueController.getAllIssues);

export const issueRoter = router;