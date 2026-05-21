type Role = "maintainer" | "contributor";

export type User = {
  name: string;
  email: string;
  password: string;
  role?: Role;
};

export interface ILoginUser {
  email: string;
  password: string;
}