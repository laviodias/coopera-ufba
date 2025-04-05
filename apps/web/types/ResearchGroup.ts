import { KnowledgeArea } from "./KnowledgeArea";
import { Project } from "./Project";
import { Researcher } from "./Researcher";

export type ResearchGroup = {
  id: string;
  name: string;
  description: string;
  urlCNPQ?: string;
  img?: string;
  leader: Researcher;
  knowledgeAreas: KnowledgeArea[] | string[];
  members: Researcher[] | string[];
  projects: Project[];
  createdAt: Date;
}