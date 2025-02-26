import { loadUserFromLocalStorage } from '@/lib/user.storage';
import { User, UserTypeEnum, UserRoleEnum } from '@/types/User';
import { useRouter } from 'next/navigation';

const profileAccessControl: Record<string, UserTypeEnum[]> = {
  '/cadastro-demandas': [UserTypeEnum.COMPANY],
  '/minhas-demandas': [UserTypeEnum.COMPANY],
  '/dashboard': [UserTypeEnum.RESEARCHER],
  '/user-register': [UserTypeEnum.ANY],
  '/login': [UserTypeEnum.ANY],
};

const roleAccessControl: Record<string, UserRoleEnum[]> = {
  '/cadastro-demandas': [UserRoleEnum.ANY],
  '/minhas-demandas': [UserRoleEnum.ANY],
  '/dashboard': [UserRoleEnum.ADMIN],
  '/user-register': [UserRoleEnum.ANY],
  '/login': [UserRoleEnum.ANY],
};

export function hasAccess(user: User, route: string): boolean {
  const allowedProfiles = profileAccessControl[route] || [];
  const allowedRoles = roleAccessControl[route] || [];

  const profileCanAccess =
    allowedProfiles.includes(UserTypeEnum.ANY) ||
    allowedProfiles.includes(user.utype);

  const roleCanAccess =
    allowedRoles.includes(UserRoleEnum.ANY) || allowedRoles.includes(user.role);

  return profileCanAccess && roleCanAccess;
}

export function checkAccessAndRedirect(
  router: ReturnType<typeof useRouter>,
  currentRoute: string,
) {
  try {
    const user = loadUserFromLocalStorage();
    if (!user || !hasAccess(user, currentRoute)) {
      router.push('/login');
    }
  } catch {
    return;
  }
}
