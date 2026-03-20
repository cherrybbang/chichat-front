export type Message = {
  id: string;
  content: string;
  role: "user" | "bot";
  created_at: string;
};