type Role = "maintainer" | "contributor";

export type User = {
  name: string;
  email: string;
  password: string;
  role?: Role;
};