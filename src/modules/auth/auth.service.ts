import { pool } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { ILoginUser, User } from "./auth.interface";
import config from "../../config/env.config";

const createUserIntoDB = async (payload: User) => {
  const { name, email, password, role } = payload;
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *
    `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  const user = userData.rows[0];
  if (userData.rows.length === 0) {
    throw new Error("Invalid credential!");
  }
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid credential!");
  }
  // genarate token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtpayload, config.secret_key as string, {
    expiresIn: "10d",
  });
  delete user.password;
  const result = {token: accessToken, user: user};
  return result;
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
