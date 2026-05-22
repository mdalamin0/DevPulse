import { Router, type Request, type Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth("contributor", "maintainer"), issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.put("/:id",auth("contributor", "maintainer"),issueController.updateIssue)
router.delete("/:id",auth("maintainer"), issueController.deleteIssue)

export const issueRoter = router;