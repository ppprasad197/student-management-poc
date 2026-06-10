import { Component, inject } from '@angular/core';
import * as BookActions from '../../store/book.actions';
import * as BookSelectors from '../../store/book.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { filter, first } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-my-borrow-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './my-borrow-books.component.html',
  styleUrl: './my-borrow-books.component.css'
})
export class MyBorrowBooksComponent {

  private store = inject(Store);
  private notification = inject(NotificationService);

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
        filter((message): message is string => !!message),
        first()
      )
      .subscribe(message => {
        this.notification.success(message);
      });

    this.store.select(
      BookSelectors.selectBookError
    )
      .pipe(
        filter((error): error is string => !!error),
        first()
      )
      .subscribe(error => {
        this.notification.error(error);
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
        filter((message): message is string => !!message),
        first()
      )
      .subscribe(message => {
        this.notification.success(message);
      });

    this.store.select(
      BookSelectors.selectBookError
    )
      .pipe(
        filter((error): error is string => !!error),
        first()
      )
      .subscribe(error => {
        this.notification.error(error);
      });
  }
}
