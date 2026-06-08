import { Student } from "./student.model";

export interface StudentPageResponse {
    students: Student[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}