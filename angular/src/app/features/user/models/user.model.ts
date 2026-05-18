export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
    userStatus: 'PENDING'|'APPROVED';
}