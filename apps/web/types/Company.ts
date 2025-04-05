import { User } from "./User";
import { Demand } from "./Demand";

export type Company = {
  user: User;
  userId: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  demands: Demand[]
}