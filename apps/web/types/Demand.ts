import { Attachment } from './Attachment';
import { Company } from './Company';
import { Project } from './Project';

export enum DemandStatusEnum {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  FINISHED = 'FINISHED',
  DELETED = 'DELETED'
}

export type Demand = {
  id: string;
  name: string;
  description: string;
  link?: string;
  public: boolean;
  keywords?: string[];
  company: Company;
  status: DemandStatusEnum;
  attachments: Attachment[];
  projects: Project[] | string[];
}