import { User } from "../models/user.model";

export interface UserState {
    users: User[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}