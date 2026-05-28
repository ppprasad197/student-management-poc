export interface SignupRequest {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    role: string;
    studentId: string;
    successMessage: string | null;
}
