import React, { createContext, useContext, useState } from "react";
import { AuthContextType } from "../types/auth";
import { loginAPI, logoutAPI } from "../api/authAPI";
import { User } from "../types/users";

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    loading: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }){
    const [user, setUser] = useState<User | null>(null);
    const loading = false

    const login = async (email: string, password: string) => {
        const userData = await loginAPI({ email, password });
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData))
    };

    const logout = async () => {
        await logoutAPI();
        setUser(null);
        localStorage.removeItem("user")
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}