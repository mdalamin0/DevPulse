type Type = "bug" | "feature_request";
type Status = "open" | "in_progress" | "resolved";

export type Issue = {
  title: string;
  description: string;
  type: Type;
  status: Status;
  reporter_id: number;
};
