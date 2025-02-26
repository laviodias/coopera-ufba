export type EResearcherType = 'TEACHER' | 'STUDENT';

export type TLeader = {
  userId: string;
  urlLattes: string | null;
  researcherType: EResearcherType;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Project = {
  id: string;
  name: string;
  researchGroupId: string;
  demandId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TMember = {
  userId: string;
  urlLattes: string | null;
  researcherType: EResearcherType;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type ResearchGroup = {
  id: string;
  name: string;
  description: string;
  urlCNPQ?: string;
  img: string | null;
  researcherId: string;
  leader: TLeader;
  members: TMember[];
  projects: Project[];
};
