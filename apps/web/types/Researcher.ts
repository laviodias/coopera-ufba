import { ResearchGroup } from "./ResearchGroup";
import { User } from "./User";

export enum ResearcherTypeEnum {
  STUDENT='STUDENT',
  TEACHER='TEACHER',
}

export type Researcher = {
  user: User;
  userId: string;
  urlLattes?: string;
  researcherType: ResearcherTypeEnum;
  researchGroupsAsLeader: ResearchGroup[];
  researchGroupsAsMember: ResearchGroup[];
}