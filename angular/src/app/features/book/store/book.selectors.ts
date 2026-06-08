import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.state';

export const selectBookState = createFeatureSelector<BookState>('books');

export const selectBooks = createSelector(
    selectBookState,
    (state) => state.book
)

export const selectBookPage = createSelector(
    selectBookState,
    state => ({
        books: state.book,
        currentPage: state.currentPage,
        totalPages: state.totalPages
    })
);

export const selectMyBorrowedBooks =
    createSelector(
        selectBookState,
        (state) => state.myBorrowedBooks
    );

export const selectBorrowedBooks =
    createSelector(
        selectBookState,
        (state) => state.borrowedBooks
    );

export const selectBookSuccessMessage =
    createSelector(
        selectBookState,
        (state) => state.successMessage
    );

export const selectBookError =
    createSelector(
        selectBookState,
        (state) => state.error
    );