import { Demand } from "./Demand";
import { ResearchGroup } from "./ResearchGroup";

export enum SimilarityMatchType {
    GROUP = 'GROUP',
    DEMAND = 'DEMAND',
}

export type SimilarityMatch = {
  id: string;
  score: number;
  sourceType: SimilarityMatchType;
  targetType: SimilarityMatchType;
  target: ResearchGroup | Demand;
  targetId: string;
}