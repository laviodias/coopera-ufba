import httpService from "./http.service";
import { User } from "@/types/User";

class UserService {

    async handleAuthResponse(response: Response) {
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data?.message || 'Falha no login';
            throw new Error(errorMessage);
        }
        return data;
    }

    async login(email: string, password: string) {
        const response = await httpService.post('/auth/login', { email, password });
        return await this.handleAuthResponse(response);
    }

    async register(user: User) {
        const response = await httpService.post('/users', {...user});
        return await this.handleAuthResponse(response);
    }

    async getUserProfile() {
        return httpService.get("/user/profile");
    }

    async updateUserProfile(data: Record<string, unknown>) {
        return httpService.put("/user/profile", data);
    }

    async deleteUserAccount() {
        return httpService.delete("/user");
    }

    async recoverPassword(email: string) {
        return httpService.post("/auth/forgot-password", { email });
    }

    async resetPassword(token: string, password: string) {
        return httpService.post(`/auth/reset-password/${token}`, { password });
    }
}

export default new UserService();
