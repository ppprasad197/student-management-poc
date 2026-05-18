export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    studentId: string;
    userStatus: 'PENDING' | 'APPROVED'
}