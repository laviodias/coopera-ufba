import { ResearchGroup } from '@/types/ResearchGroup';

export type MyResearchGroup = {
  id: string;
  name: string;
  image?: string;
  leader: {
    userId: string;
  };
};

export type PesquisadorGrupo = {
  id: string;
  groupsAsMember: ResearchGroup[];
  groupsAsLeader: ResearchGroup[];
};
