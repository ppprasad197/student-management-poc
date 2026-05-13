import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.state';

export const selectBookState = createFeatureSelector<BookState>('books');

export const selectBooks = createSelector(
    selectBookState,
    (state) => state.book
)

