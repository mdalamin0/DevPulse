import { pool } from "../../db";
import type { Issue } from "./issue.interface";
import type { Response } from "express";
import sendResponse from "../../utility/sendResponse";
import type { JwtUser } from "../../types";

const createIssueIntoDB = async (payload: Issue, user: JwtUser) => {
  const { title, description, type, status } = payload;
  const userData = await pool.query(`SELECT * FROM users WHERE id=$1`, [user.id]);
  if (userData.rows.length === 0) {
    throw new Error("User not found!");
  }
  const result = await pool.query(
    `
      INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1, $2, $3, COALESCE($4, 'open'), $5) RETURNING *
      `,
    [title, description, type, status, user.id],
  );
  return result;
};

const getAllIssuesFromDB = async () => {
  const issues = await pool.query(`SELECT * FROM issues`);
  const reporterIds = issues.rows.map((issue) => issue.reporter_id);

  const users = await pool.query(
    `SELECT id, name, role FROM users WHERE id=ANY($1)`,
    [reporterIds],
  );
  const userMap = new Map(users.rows.map((user) => [user.id, user]));
  const result = issues.rows.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: userMap.get(issue.reporter_id),
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));
  return result;
};

const getSingleIssueFromDB = async (res: Response, id: string) => {
  const issueData = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
  const issue = issueData.rows[0];
  if (issueData.rows.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Issue not found!",
    });
  }
  const userData = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id],
  );
  const user = userData.rows[0];

  const result = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: user,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
  return result;
};

const updateIssueIntoDB = async (
  payload: Partial<Issue>,
  id: string,
  user: JwtUser,
) => {
  // payload= data from req.body
  const { title, description, type, status } = payload;
  // user=decoded user recive from req.user
  const {id: userId, role } = user;
  const issueData = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
  const issue = issueData.rows[0];
  if (role === "maintainer") {
    const result = await pool.query(
      `
    UPDATE issues SET
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    type = COALESCE($3, type),
    status = COALESCE($4, status),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
    `,
      [title, description, type, status, id],
    );
    return result;
  } else if (
    role === "contributor" &&
    issue.reporter_id === userId &&
    issue.status === "open"
  ) {
    const result = await pool.query(
      `
    UPDATE issues SET
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    type = COALESCE($3, type),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
    `,
      [title, description, type, id],
    );
  
    return result;
  } else {
    throw new Error("Forbidden!");
  }
};

const deleteIssue = async (id: string) => {
  const result = await pool.query(`DELETE FROM issues WHERE id=$1`, [id]);
  return result;
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssue,
};
