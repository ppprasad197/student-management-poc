import { Book } from "./book.model";

export interface BookPageResponse {
    books: Book[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}