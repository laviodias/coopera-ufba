import { Demand } from "./Demand";
import { Project } from "./Project";

export enum SimilarityMatchType {
    PROJECT = 'PROJECT',
    DEMAND = 'DEMAND',
}

export type SimilarityMatch = {
  id: string;
  score: number;
  sourceType: SimilarityMatchType;
  targetType: SimilarityMatchType;
  target: Demand | Project;
  targetId: string;
}