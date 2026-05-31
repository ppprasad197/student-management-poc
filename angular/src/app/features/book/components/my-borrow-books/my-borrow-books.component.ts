import { Component, inject } from '@angular/core';
import * as BookActions from '../../store/book.actions';
import * as BookSelectors from '../../store/book.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-my-borrow-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './my-borrow-books.component.html',
  styleUrl: './my-borrow-books.component.css'
})
export class MyBorrowBooksComponent {

  private store = inject(Store);

  borrowedBooks$ = this.store.select(
    BookSelectors.selectMyBorrowedBooks
  );

  ngOnInit() {
    this.store.dispatch(
      BookActions.loadMyBorrowedBooks()
    );
  }

  returnBook(id: number) {

    this.store.dispatch(
      BookActions.clearBookMessages()
    );

    this.store.dispatch(
      BookActions.returnBook({ id })
    );

    this.store.select(
      BookSelectors.selectBookSuccessMessage
    )
      .pipe(
        filter(message => !!message),
        first()
      )
      .subscribe(message => {
        alert(message);
      });

    this.store.select(
      BookSelectors.selectBookError
    )
      .pipe(
        filter(error => !!error),
        first()
      )
      .subscribe(error => {
        alert(error);
      });
  }

  renewBook(id: number) {

    this.store.dispatch(
      BookActions.clearBookMessages()
    );

    this.store.dispatch(
      BookActions.renewBook({ id })
    );

    this.store.select(
      BookSelectors.selectBookSuccessMessage
    )
      .pipe(
        filter(message => !!message),
        first()
      )
      .subscribe(message => {
        alert(message);
      });

    this.store.select(
      BookSelectors.selectBookError
    )
      .pipe(
        filter(error => !!error),
        first()
      )
      .subscribe(error => {
        alert(error);
        console.log("Error is : " + error)
      });
  }
}
