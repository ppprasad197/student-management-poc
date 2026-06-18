export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    available: boolean;
    quantity: number;
    isDeleted: boolean;
}