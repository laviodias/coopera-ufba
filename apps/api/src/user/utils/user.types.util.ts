import { ResearcherType } from '@prisma/client';

export const COMPANY = 'COMPANY';
export const RESEARCHER = 'RESEARCHER';
export const NONE = 'NONE';

export function getUserType(user: any) {
  if (user.company && user?.company?.contactEmail) {
    return COMPANY;
  } else if (user.researcher) {
    if (user?.researcher?.researcherType == ResearcherType.STUDENT) {
      return 'RESEARCHER_STUDENT';
    } else if (user?.researcher?.researcherType == ResearcherType.TEACHER) {
      return 'RESEARCHER_TEACHER';
    }
    return RESEARCHER;
  }
  return NONE;
}
