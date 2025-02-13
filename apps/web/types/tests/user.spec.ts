import { User, UserTypeEnum, UserRoleEnum } from "@/types/User";

describe('hasAccess', () => {
    it('Should convert from string and to string propertly', () => {
        const user = {
            id: '789e4567-e89b-12d3-a456-426614174000',
            name: 'Anakin Skywalker',
            utype: UserTypeEnum.COMPANY,
            role: UserRoleEnum.USER,
            img: '',
            access_token: ''
        }
        const userString = JSON.stringify(user);

        const userObject: User = JSON.parse(userString);

        expect(userObject.utype).toBe(UserTypeEnum.COMPANY);
        expect(userObject.role).toBe(UserRoleEnum.USER);
    });

});