import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import { BookState } from './book.state';

export const bookFeatureKey = 'book';

export const initialState: BookState = {
  book: [],
  loading: false,
  error: null
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
    (state, { id }) => ({

      ...state,

      books: state.book.filter(
        book => book.id !== id
      )

    })),

  on(BookActions.deleteBookFailure,
    (state, { error }) => ({

      ...state,

      error

    })),

  on(BookActions.updateBookSuccess,
    (state, { book }) => ({

      ...state,

      books: state.book.map((b) =>

        b.id === book.id
          ? book
          : b

      )

    })),
);

