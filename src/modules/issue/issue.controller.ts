import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
  const {id} = req.user;
  try {
    const result = await issueService.createIssueIntoDB(
      req.body,
      id as string,
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All issues retrieve  successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(res, id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single issue retrieve  successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssue = async(req: Request, res: Response) => {
  const {id} = req.params;
  console.log("from issu controller: ",req.user);
  try {
    const result = await issueService.deleteIssue(id as string);
    if(result.rowCount === 0){
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const updateIssue = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const result = await issueService.updateIssueIntoDB(req.body, id as string)
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: "Issue updated successfully",
     });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
};
