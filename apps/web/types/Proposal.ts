import { ResearchGroup } from "./ResearchGroup";
import { User } from "./User";

export enum ProposalStatusEnum {
  PENDING='PENDING',
  ACCEPTED='ACCEPTED',
  REJECTED='REJECTED',
}

export type Proposal = {
  id: string;
  demandId: string;
  researchGroupId: string;
  researchGroup: ResearchGroup;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  message: string;
  status: ProposalStatusEnum;
}