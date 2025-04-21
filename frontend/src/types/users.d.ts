export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}