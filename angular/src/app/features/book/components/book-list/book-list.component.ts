import { Component, inject } from '@angular/core';
import * as BookActions from '../../store/book.actions';
import { filter, first, Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { Store } from '@ngrx/store';
import * as BookSelectors from '../../store/book.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as AuthSelectors from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  private store = inject(Store);

  books =
    this.store.select(BookSelectors.selectBooks);

  ngOnInit(): void {
    this.store.dispatch(
      BookActions.loadBooks()
    );
  }

  deleteBook(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (confirmed) {
      this.store.dispatch(
        BookActions.deleteBook({ id })
      );
    }
  }

  updateBook(id: number, book: Book) {
    this.store.dispatch(BookActions.updateBook({ id, book }));
  }

  borrowBook(id: number) {
    this.store.dispatch(
      BookActions.clearBookMessages()
    );

    this.store.dispatch(
      BookActions.borrowBook({ id })
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

  returnBook(id: number) {
    this.store.dispatch(
      BookActions.returnBook({ id })
    );
    this.store.select(
      BookSelectors.selectBookSuccessMessage
    )
      .pipe(first())
      .subscribe(message => {
        if (message) {
          alert(message);
        }
      });
    this.store.select(
      BookSelectors.selectBookError
    )
      .pipe(first())
      .subscribe(error => {
        if (error) {
          alert(error);
        }
      });
  }

  currentUser =
    this.store.select(
      AuthSelectors.selectCurrentUser
    );
}
