export type Role = "maintainer" | "contributor";
export interface JwtUser {
  id: number;
  name: string;
  role: Role;
}