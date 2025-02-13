import { makeAutoObservable } from "mobx";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  deleteUserFromLocalStorage,
  persistUserToLocalStorage,
} from "@/lib/user.storage";
import userService from "@/api/user.service";
import { User, UserTypeEnum, UserRoleEnum } from "@/types/User";

class LoginContext {
  isLoading: boolean = false;
  isAuthenticated: boolean = false;
  errorMessage: string = "";
  user: User | null = null;

  whenLoginSuccessURL: string = "/";

  constructor() {
    makeAutoObservable(this);
  }

  redirectUser(userRole: UserRoleEnum, userType: UserTypeEnum) {
    switch (userRole) {
      case UserRoleEnum.ADMIN:
        return "/painel-administrativo";
    }
    switch (userType) {
      case UserTypeEnum.COMPANY:
        return "/encontrar-grupo-pesquisa";
      case UserTypeEnum.RESEARCHER:
        return "/encontrar-demandas";
      default:
        return "/";
    }
  }

  async login(email: string, password: string, router: AppRouterInstance) {
    this.isLoading = true;
    this.errorMessage = "";

    try {
      const user: User = await userService.login(email, password);
      this.user = user;
      persistUserToLocalStorage({ ...user, email });
      this.isAuthenticated = true;

      router.push(this.redirectUser(user.role, user.utype));
    } catch (error: any) {
      this.errorMessage = error.message || "Login failed.";
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.user = null;
    this.isLoading = false;
    this.isAuthenticated = false;
    this.errorMessage = "";
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    deleteUserFromLocalStorage();
  }
}

export default new LoginContext();
