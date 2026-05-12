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

  
);

