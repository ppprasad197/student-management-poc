import { User } from "./user.model";

export interface LoginRequest {
    userName: string;
    password: string
}

export interface AuthState {
    user: User | null;

    username: string | null;

    loading: boolean;

    error: string | null;
} 