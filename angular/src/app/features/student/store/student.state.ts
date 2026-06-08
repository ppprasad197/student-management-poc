import { Student } from "../models/student.model";

export interface StudentState {
    students: Student[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null
    successMessage: string | null;
}