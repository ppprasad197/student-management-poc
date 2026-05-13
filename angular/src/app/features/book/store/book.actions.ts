import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../models/book.model';

export const loadBooks = createAction(
  '[Book]Load Books'
);

export const loadBookSuccess = createAction(
  '[Book]Load Books Success',
  props<{ books: Book[] }>()
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
  props<{ book: Book }>()
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
  props<{ book: Book }>()
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
  props<{ id: number }>()
);

export const deleteBookFailure = createAction(
  '[Book] Delete Book Failure',
  props<{ error: string }>()
);

export const borrowBook = createAction(
  '[Book]Borrow Book',
  props<{ id: number }>()
);

export const returnBook = createAction(
  '[Book]Return Book',
  props<{ id: number }>()
);

export const renewBook = createAction(
  '[Book]Renew Book',
  props<{ id: number }>()
);



