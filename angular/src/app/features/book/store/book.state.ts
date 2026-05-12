import { Book } from "../models/book.model";

export interface BookState {
    book: Book[];
    loading: boolean;
    error: string | null;
}