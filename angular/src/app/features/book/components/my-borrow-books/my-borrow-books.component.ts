import { Component, inject } from '@angular/core';
import * as BookActions from '../../store/book.actions';
import * as BookSelectors from '../../store/book.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
      BookActions.returnBook({ id })
    );

  }

  renewBook(id: number) {

    this.store.dispatch(
      BookActions.renewBook({ id })
    );

  }
}
