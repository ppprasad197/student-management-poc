import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as BookActions from '../store/book.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Book } from '../models/book.model';


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

}
