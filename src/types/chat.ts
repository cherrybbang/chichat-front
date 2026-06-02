export type Message = {
  id: string;
  content: string;
  role: "user" | "bot";
  created_at: string;
};

export type Room = {
  id: string;
  created_at: string;
  preview?: string;
};