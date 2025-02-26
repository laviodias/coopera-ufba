import { Company } from "./Company";
import { Researcher } from "./Researcher";
import { Notification } from "./Notification";

export enum UserRoleEnum {
  USER="USER",
  ADMIN="ADMIN",
  ANY="ANY",
}

export enum UserStatusEnum {
  APPROVED="APPROVED",
  BLOCK="BLOCK",
  PENDING="PENDING",
}

export enum UserTypeEnum {
  COMPANY="COMPANY",
  RESEARCHER="RESEARCHER",
  NONE="NONE",
  ANY="ANY",
}

export type User = {
  id: string;
  email: string;
  name: string;
  img?: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  resetToken?: string;
  company?: Company;
  researcher?: Researcher;
  utype: UserTypeEnum;
  notifications?: Notification[];
  access_token?: string;
}