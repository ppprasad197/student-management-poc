import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import { BookState } from './book.state';
import { state } from '@angular/animations';

export const bookFeatureKey = 'book';

export const initialState: BookState = {
  book: [],
  loading: false,
  error: null,
  myBorrowedBooks: [],
  borrowedBooks: [],
  successMessage: null
};

export const bookReducer = createReducer(
  initialState,

  on(BookActions.loadBooks, (state) => ({
    ...state,
    loading: true
  })),

  on(BookActions.loadBookSuccess, (state, { books }) => ({
    ...state,
    loading: false,
    book: books
  })),

  on(BookActions.loadBookFailure, (state, { error }) => ({
    ...state,
    error: error
  })),


  on(BookActions.deleteBookSuccess,
    (state, { id, message }) => ({
      ...state,
      books: state.book.filter(
        book => book.id !== id
      ),
      successMessage: message
    })),

  on(BookActions.deleteBookFailure,
    (state, { error }) => ({
      ...state,
      error
    })),

  on(BookActions.updateBookSuccess,
    (state, { book, message }) => ({
      ...state,
      book: state.book.map((b) =>
        b.id === book.id
          ? book
          : b
      ),
      successMessage: message,
      error: null
    })),

  on(BookActions.borrowBook, (state) => ({
    ...state,
    loading: true
  })),

  on(BookActions.borrowBookSuccess, (state) => ({
    ...state,
    loading: false,
    successMessage: "Book borrowed successfully"
  })),

  on(BookActions.borrowBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(BookActions.returnBook, (state) => ({
    ...state,
    loading: true
  })),

  on(BookActions.returnBookSuccess, (state) => ({
    ...state,
    loading: false,
    successMessage: "Book returned successfully"
  })),

  on(BookActions.returnBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(
    BookActions.loadMyBorrowedBooksSuccess,
    (state, { books }) => ({
      ...state,
      myBorrowedBooks: books
    })
  ),

  on(BookActions.renewBook, (state) => ({
    ...state,
    loading: true
  })),

  on(BookActions.renewBookSuccess, (state) => ({
    ...state,
    loading: false,
    successMessage: 'Book renewed successfully'
  })),

  on(BookActions.renewBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(BookActions.loadBorrowedBooks, (state) => ({
    ...state,
    loading: true
  })),

  on(BookActions.loadBorrowedBooksSuccess, (state, { books }) => ({
    ...state,
    borrowedBooks: books,
    loading: false
  })),

  on(BookActions.loadBorrowedBooksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(BookActions.clearBookMessages, (state) => ({
    ...state,
    successMessage: null,
    error: null
  })),

  on(BookActions.addBookSuccess, (state, { message }) => ({
    ...state,
    successMessage: message,
    error: null
  })),

  on(BookActions.addBookFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

