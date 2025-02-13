import { User } from "./User";
import { Demand } from "./Demand";

export type Company = {
  user: User;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  demands: Demand[]
}