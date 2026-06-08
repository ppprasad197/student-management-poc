import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../models/book.model';
import { BorrowedBook } from '../models/borrowed-book.model';

export const loadBooks = createAction(
  '[Book]Load Books',
  props<{ page: number; size: number }>()
);

export const loadBookSuccess = createAction(
  '[Book]Load Books Success',
  props<{
    books: Book[];
    currentPage: number;
    totalPages: number
  }>()
);

export const loadBookFailure = createAction(
  '[Book]Load Books Failure',
  props<{ error: string }>()
);

export const addBook = createAction(
  '[Book] Add Book',
  props<{ book: Book }>()
);

export const addBookSuccess = createAction(
  '[Book] Add Book Success',
  props<{ book: Book; message: string }>()
);

export const addBookFailure = createAction(
  '[Book] Add Book Failure',
  props<{ error: string }>()
);

export const updateBook = createAction(
  '[Book] Update Book',
  props<{ id: number, book: Partial<Book> }>()
);

export const updateBookSuccess = createAction(
  '[Book] Update Book Success',
  props<{ book: Book; message: string }>()
);

export const updateBookFailure = createAction(
  '[Book] Update Book Failure',
  props<{ error: string }>()
);

export const deleteBook = createAction(
  '[Book]Delete Book',
  props<{ id: number }>()
);

export const deleteBookSuccess = createAction(
  '[Book] Delete Book Success',
  props<{ id: number; message: string }>()
);

export const deleteBookFailure = createAction(
  '[Book] Delete Book Failure',
  props<{ error: string }>()
);

export const borrowBook = createAction(
  '[Book]Borrow Book',
  props<{ id: number }>()
);

export const borrowBookSuccess = createAction(
  '[Book] Borrow Book Success',
  props<{ message: string }>()
);

export const borrowBookFailure = createAction(
  '[Book] Borrow Book Failure',
  props<{ error: string }>()
);

export const returnBook = createAction(
  '[Book]Return Book',
  props<{ id: number }>()
);

export const returnBookSuccess = createAction(
  '[Book] Return Book Success',
  props<{ message: string }>()
);

export const returnBookFailure = createAction(
  '[Book] Return Book Failure',
  props<{ error: string }>()
);

export const renewBook = createAction(
  '[Book]Renew Book',
  props<{ id: number }>()
);

export const renewBookSuccess = createAction(
  '[Book] Renew Book Success',
  props<{ message: string }>()
);

export const renewBookFailure = createAction(
  '[Book] Renew Book Failure',
  props<{ error: string }>()
);


export const loadMyBorrowedBooks = createAction(
  '[Book] Load My Borrowed Books'
);

export const loadMyBorrowedBooksSuccess = createAction(
  '[Book] Load My Borrowed Books Success',
  props<{ books: BorrowedBook[] }>()
);

export const loadMyBorrowedBooksFailure = createAction(
  '[Book] Load My Borrowed Books Failure',
  props<{ error: string }>()
);

export const loadBorrowedBooks = createAction(
  '[Borrow] Load Borrowed Books'
);

export const loadBorrowedBooksSuccess = createAction(
  '[Borrow] Load Borrowed Books Success',
  props<{ books: BorrowedBook[] }>()
);

export const loadBorrowedBooksFailure = createAction(
  '[Borrow] Load Borrowed Books Failure',
  props<{ error: string }>()
);

export const clearBookMessages = createAction(
  '[Book] Clear Messages'
);

