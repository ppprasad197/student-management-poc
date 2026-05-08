import { Student } from "../models/student.model";

export interface StudentState {
    students: Student[];
    loading: boolean;
    error: string | null
}