import { User, UserCredentials } from "../types/users";
import apiClient from "./apiClient"

export async function loginAPI(credentials: UserCredentials): Promise<User>{
    try{
        const {data} = await apiClient.post<{message: string, user: User}>("/auth/login", credentials, {withCredentials: true});
        return data.user
    } catch(error) {    
        console.error('Login failed:', error);
        throw new Error("Failed to login");
    }
}

export async function logoutAPI(): Promise<void>{
    try{
        await apiClient.post("/auth/logout", {withCredentials: true});
    } catch(error) {    
        console.error('Logout failed:', error);
        throw new Error("Failed to login");
    }
}