import { User } from "../models/user.model";

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}