import { Attachment } from './Attachment';
import { Company } from './Company';
import { Keyword } from './Keyword';
import { Project } from './Project';

export enum DemandStatusEnum {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  FINISHED = 'FINISHED',
  DELETED = 'DELETED'
}

export enum DemandStatusTranslationEnum {
  CREATED = 'Sem parceiro',
  ACCEPTED = 'Parceria aceita',
  FINISHED = 'Finalizada',
  DELETED = 'Excluida'
}

export type Demand = {
  id: string;
  name: string;
  description: string;
  link?: string;
  public: boolean;
  keywords: Keyword[] | string[];
  company: Company;
  status: DemandStatusEnum;
  attachments: Attachment[];
  projects: Project[] | string[];
  createdAt: Date;
}