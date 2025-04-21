export interface AuthContextType {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}
