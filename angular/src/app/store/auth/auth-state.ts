import { User } from "../../core/models/user.model";

export interface AuthState {
    user: User | null;

    username: string | null;

    loading: boolean;

    error: string | null;
}
