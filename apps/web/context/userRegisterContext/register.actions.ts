import { Company } from "@/types/Company";
import { Researcher, ResearcherTypeEnum } from "@/types/Researcher";
import { UserTypeEnum, UserRoleEnum, User } from "@/types/User";


export function getUserFromData(userData: {
    name: string,
    utype: string,
    email: string,
    password: string,
    passwordConfirmation: string
  }): User {

    let company: Partial<Company> | undefined;
    let researcher: Partial<Researcher> | undefined;

    if (userData.utype == UserTypeEnum.COMPANY) {
        company = {
            contactName: userData.name,
            contactEmail: userData.email
        }
    } else if (userData.utype == UserTypeEnum.RESEARCHER) {
        researcher = {
            researcherType: ResearcherTypeEnum.STUDENT
        }
    } else {
        researcher = undefined;
        company = undefined;
    }

    const createUser: Partial<User> = {
        ...userData,
        role: UserRoleEnum.USER,
        company: company as Company, 
        researcher: researcher as Researcher
    };
    return createUser;
}