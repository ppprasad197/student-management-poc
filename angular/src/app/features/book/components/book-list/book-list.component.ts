import { Component, inject } from '@angular/core';
import * as BookActions from '../../store/book.actions';
import { Observable } from 'rxjs';
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

  books$ =
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

  borrowBook(id: number) {

    this.store.dispatch(
      BookActions.borrowBook({ id })
    );

  }

  returnBook(id: number) {

    this.store.dispatch(
      BookActions.returnBook({ id })
    );

  }

  currentUser =
    this.store.select(
      AuthSelectors.selectCurrentUser
    );
}
