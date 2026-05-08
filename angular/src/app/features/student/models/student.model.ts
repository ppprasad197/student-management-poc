export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    studentId: string;
    userStatus: 'PENDING' | 'APPROVED'
}