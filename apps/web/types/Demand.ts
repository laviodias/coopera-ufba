import { Attachment } from './Attachment';
import { Company } from './Company';

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
}