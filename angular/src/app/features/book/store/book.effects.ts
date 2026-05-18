import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as BookActions from '../store/book.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Book } from '../models/book.model';
import { BorrowedBook } from '../models/borrowed-book.model';


@Injectable()
export class BookEffects {

  private actions = inject(Actions);
  constructor(private bookService: BookService) { }

  loadBooks = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bookService.getBooks().pipe(
          map((books) =>
            BookActions.loadBookSuccess({
              books
            })),
          catchError((error) =>
            of(
              BookActions.loadBookFailure({
                error: error.message
              })
            ))
        ))
    )
  );

  deleteBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.deleteBook),
      switchMap(({ id }) =>
        this.bookService.deleteBook(id).pipe(
          map(() =>
            BookActions.deleteBookSuccess({ id })
          ),
          catchError((error) =>
            of(
              BookActions.deleteBookFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );


  addBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.addBook),
      switchMap(({ book }) =>
        this.bookService.addBook(book).pipe(
          map((savedBook: Book) =>
            BookActions.addBookSuccess({
              book: savedBook
            })
          ),
          catchError((error) =>
            of(
              BookActions.addBookFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  addBookSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.addBookSuccess),
      map(() =>
        BookActions.loadBooks()
      )
    )
  );

  updateBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.updateBook),
      switchMap(({ id, book }) =>
        this.bookService.updateBook(id, book).pipe(
          map((updatedBook: Book) =>
            BookActions.updateBookSuccess({
              book: updatedBook
            })
          ),
          catchError((error) =>
            of(
              BookActions.updateBookFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );


  borrowBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.borrowBook),
      switchMap(({ id }) =>
        this.bookService.borrowBook(id).pipe(
          map((book: Book) =>
            BookActions.borrowBookSuccess({
              book
            })
          ),
          catchError((error) =>
            of(
              BookActions.borrowBookFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  borrowBookSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.borrowBookSuccess),
      map(() =>
        BookActions.loadBooks()
      )
    )
  );

  returnBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.returnBook),
      switchMap(({ id }) =>
        this.bookService.returnBook(id).pipe(
          map((book: Book) =>
            BookActions.returnBookSuccess({
              book
            })
          ),
          catchError((error) =>
            of(
              BookActions.returnBookFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  returnBookSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.returnBookSuccess),
      map(() =>
        BookActions.loadBooks()
      )
    )
  );


  loadMyBorrowedBooks = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.loadMyBorrowedBooks),
      switchMap(() =>
        this.bookService.getMyBorrowedBooks().pipe(
          map((books: BorrowedBook[]) =>
            BookActions.loadMyBorrowedBooksSuccess({
              books
            })
          ),
          catchError((error) =>
            of(
              BookActions.loadMyBorrowedBooksFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  renewBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.renewBook),
      switchMap(({ id }) =>
        this.bookService.renewBook(id).pipe(
          map((book: Book) =>
            BookActions.renewBookSuccess({
              book
            })
          ),
          catchError((error) =>
            of(
              BookActions.renewBookFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  renewBookSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.renewBookSuccess),
      map(() =>
        BookActions.loadMyBorrowedBooks()
      )
    )
  );
}
