import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as BookActions from '../store/book.actions';
import { catchError, map, of, switchMap, zip } from 'rxjs';
import { Book } from '../models/book.model';
import { BorrowedBook } from '../models/borrowed-book.model';


@Injectable()
export class BookEffects {

  private actions = inject(Actions);
  constructor(private bookService: BookService) { }

  loadBooks = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.loadBooks),
      switchMap(({ page, size }) =>
        this.bookService.getBooks(page, size).pipe(
          map((response) =>
            BookActions.loadBookSuccess({
              books: response.books,
              currentPage: response.currentPage,
              totalPages: response.totalPages
            })),
          catchError((error) =>
            of(
              BookActions.loadBookFailure({
                error: error.error || error.message
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
            BookActions.deleteBookSuccess({ id, message: "Book deleted successfully" })
          ),
          catchError((error) =>
            of(
              BookActions.deleteBookFailure({
                error: error.error || error.message
              })
            )
          )
        )
      )
    )
  );

  deleteBookSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.deleteBookSuccess),
      map(() =>
        BookActions.loadBooks({ page: 0, size: 5 })
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
              book: savedBook,
              message: "Book added successfully"
            })
          ),
          catchError((error) =>
            of(
              BookActions.addBookFailure({
                error: error.error || error.message
              })
            )
          )
        )
      )
    )
  );

  addBookSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.addBookSuccess),
      map(() =>
        BookActions.loadBooks({ page: 0, size: 5 })
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
              book: updatedBook,
              message: "Book updated successfully"
            })
          ),
          catchError((error) =>
            of(
              BookActions.updateBookFailure({
                error: error.error || error.message
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
          map((message: string) =>
            BookActions.borrowBookSuccess({
              message
            })
          ),
          catchError((error) =>
            of(
              BookActions.borrowBookFailure({
                error: error.error || error.message
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
        BookActions.loadBooks({ page: 0, size: 5 })
      )
    )
  );

  returnBook = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.returnBook),
      switchMap(({ id }) =>
        this.bookService.returnBook(id).pipe(
          map((message: string) =>
            BookActions.returnBookSuccess({
              message
            })
          ),
          catchError((error) =>
            of(
              BookActions.returnBookFailure({
                error: error.error || error.message
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
        BookActions.loadMyBorrowedBooks()
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
                error: error.error || error.message
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
          map((message: string) =>
            BookActions.renewBookSuccess({
              message
            })
          ),
          catchError((error) =>
            of(
              BookActions.renewBookFailure({
                error: error.error || error.message
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

  loadBorrowedBooks = createEffect(() =>
    this.actions.pipe(
      ofType(BookActions.loadBorrowedBooks),
      switchMap(() =>
        this.bookService
          .getAllBorrowedBooksByStudents()
          .pipe(
            map((books) =>
              BookActions.loadBorrowedBooksSuccess({
                books
              })
            ),
            catchError((error) =>
              of(
                BookActions.loadBorrowedBooksFailure({
                  error: error.error || error.message
                })
              )
            )
          )
      )
    )
  );
}
