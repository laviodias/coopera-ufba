//import { Reseacher } from "../ResearchGroupList/types";

export type ResearchGroup = {
  id: string;
  name: string;
  img?: string;
  leader: {
    userId: string;
  };
};

export type PesquisadorGrupo = {
  id: string;
  groupsAsMember: ResearchGroup[];
};
