import { User } from "./User";

export type Notification = {
  id: string;
  message: string;
  url?: string;
  userId: string;
  user: User;
  createdAt: Date;
};