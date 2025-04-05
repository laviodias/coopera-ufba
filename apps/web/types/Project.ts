import { Demand } from "./Demand";
import { ResearchGroup } from "./ResearchGroup";
import { Keyword } from "./Keyword";

export type Project = {
  id: string;
  name: string;
  link?: string;
  description: string;
  researchGroup: ResearchGroup;
  researchGroupId: string;
  demand: Demand;
  demandId?: string;
  keywords: Keyword[] | string[];
}