import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import * as BookActions from '../store/book.actions';
import { catchError, map, of, switchMap } from 'rxjs';


@Injectable()
export class BookEffects {

  private actions$ = inject(Actions);
  constructor(private bookService: BookService) { }

  loadBooks = createEffect(() =>
    this.actions$.pipe(
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



}
