import { Demand } from "./Demand";
import { Project } from "./Project";

export type Keyword = {
  id : string;
  name: string;
  projects: Project[];
  demands: Demand[];
}