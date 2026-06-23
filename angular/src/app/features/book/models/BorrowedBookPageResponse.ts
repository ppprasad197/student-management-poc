import { BorrowedBook } from "./borrowed-book.model";

export interface BorrowedBookPageResponse {
    borrowRecords: BorrowedBook[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}