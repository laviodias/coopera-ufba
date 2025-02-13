import { Company } from "./Company";
import { Researcher } from "./Researcher";

export enum UserRoleEnum {
  USER="USER",
  ADMIN="ADMIN",
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
}