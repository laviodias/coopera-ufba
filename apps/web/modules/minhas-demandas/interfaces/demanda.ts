export type Keyword = { id: string; name: string };
export type Project = { id: string; name: string };
export enum Status {
  CREATED = 'Criada',
  ACCEPTED = 'Aceita',
  FINISHED = 'Finalizada',
  DELETED = 'Excluida',
}
export interface Demanda {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: string;
  projects: Project[];
  company: {
    image: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    address: {
      city: string;
      state: string;
      country: string;
    };
    user: {
      name: string;
      id: string;
    };
  };
  keywords: Keyword[];
  public: boolean;
  link: string;
}
