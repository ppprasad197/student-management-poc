import { Book } from "../models/book.model";
import { BorrowedBook } from "../models/borrowed-book.model";

export interface BookState {
    book: Book[];
    loading: boolean;
    error: string | null;
    myBorrowedBooks: BorrowedBook[];
}