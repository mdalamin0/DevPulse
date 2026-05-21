import { title } from "process";
import { pool } from "../../db";
import type { Issue } from "./issue.interface";

const createIssueIntoDB = async (payload: Issue) => {
  const { title, description, type, status, reporter_id } = payload;
  const user = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    reporter_id,
  ]);
  if (user.rows.length === 0) {
    throw new Error("User not found!");
  }
  const result = await pool.query(
    `
      INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1, $2, $3, COALESCE($4, 'open'), $5) RETURNING *
      `,
    [title, description, type, status, reporter_id],
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

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
};
