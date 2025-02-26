import { RESEARCHER, COMPANY, getUserFromData } from '../register.actions';
import { CreateUser, ResearcherType, UserRole } from '../register.types';

describe('getUserFromData function', () => {
  it('should create a CreateUser object with company details for user type EMPRESA', () => {
    const userData = {
      name: 'John Doe',
      utype: COMPANY,
      email: 'johndoe@example.com',
      password: 'secretPassword',
      passwordConfirmation: 'secretPassword',
    };

    const expectedUser: CreateUser = {
      ...userData,
      role: UserRole.USER,
      company: {
        contactName: userData.name,
        contactEmail: userData.email,
      },
    };

    const actualUser = getUserFromData(userData);

    expect(actualUser).toEqual(expectedUser);
  });

  it('should create a CreateUser object with researcher details for user type RESEARCHER', () => {
    const userData = {
      name: 'Jane Doe',
      utype: RESEARCHER,
      email: 'janedoe@example.com',
      password: 'secretPassword',
      passwordConfirmation: 'secretPassword',
    };

    const expectedUser: CreateUser = {
      ...userData,
      role: UserRole.USER,
      researcher: {
        researcherType: ResearcherType.STUDENT,
      },
    };

    const actualUser = getUserFromData(userData);

    expect(actualUser).toEqual(expectedUser);
  });

  it('should set researcherType to STUDENT by default for RESEARCHER user type', () => {
    const userData = {
      name: 'Another User',
      utype: RESEARCHER,
      email: 'anotheruser@example.com',
      password: 'secretPassword',
      passwordConfirmation: 'secretPassword',
    };

    const actualUser = getUserFromData(userData);

    expect(actualUser.researcher!.researcherType).toEqual(
      ResearcherType.STUDENT,
    );
  });

  it('should handle invalid user types and set company and researcher to null', () => {
    const userData = {
      name: 'Invalid User',
      utype: 'INVALID_TYPE',
      email: 'invaliduser@example.com',
      password: 'secretPassword',
      passwordConfirmation: 'secretPassword',
    };

    const expectedUser: CreateUser = {
      ...userData,
      role: UserRole.USER,
    };

    const actualUser = getUserFromData(userData);

    expect(actualUser).toEqual(expectedUser);
  });
});
