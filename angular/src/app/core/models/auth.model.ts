export interface LoginRequest {
    userName: string;
    password: string
}

export interface AuthState {
    user: string | null;
    loading: boolean;
    error: string | null
} 