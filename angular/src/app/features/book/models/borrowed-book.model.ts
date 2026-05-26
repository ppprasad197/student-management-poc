export interface BorrowedBook {
    id: number;

    bookId: number;

    bookTitle: string;

    author: string;

    issueDate: string;

    dueDate: string;

    returnDate: string;

    renewCount: number;

    studentId: number;
}