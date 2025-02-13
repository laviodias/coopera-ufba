import { ResearchGroup } from "./ResearchGroup";

export type KnowledgeArea = {
  id: string;
  name: string;
  researchGroupsOfArea: ResearchGroup[];
}