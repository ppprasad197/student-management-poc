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
import { NotificationService } from '../../../../shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { BookViewDialogComponent } from '../book-view-dialog/book-view-dialog.component';
import { PopupService } from '../../../../shared/services/popup.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  private store = inject(Store);
  private notification = inject(NotificationService);
  private dialog = inject(MatDialog);
  private popup = inject(PopupService);

  selectedCategory = 'ALL';
  selectedStatus = 'ALL';
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  categories: string[] = [];

  page = 0;
  size = 5;

  totalPages = 0;
  currentPage = 0;

  books =
    this.store.select(BookSelectors.selectBookPage);

  ngOnInit(): void {
    this.loadBooks();

    this.books.subscribe(resposne => {
      this.allBooks = resposne.books;
      this.totalPages = resposne.totalPages;
      this.currentPage = resposne.currentPage;
      this.filterBooks();
    }
    )
  }

  deleteBook(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (confirmed) {
      this.store.dispatch(
        BookActions.deleteBook({ id })
      );
      this.store.select(
        BookSelectors.selectBookSuccessMessage
      )
        .pipe(
          filter((message): message is string => !!message),
          first()
        )
        .subscribe(message => {
          this.popup.openSuccess(message);
        });

      this.store.select(
        BookSelectors.selectBookError
      )
        .pipe(
          filter((error): error is string => !!error),
          first()
        )
        .subscribe(error => {
          this.popup.openError(error);
        });
    }
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

  currentUser =
    this.store.select(
      AuthSelectors.selectCurrentUser
    );

  filterBooks(): void {

    this.filteredBooks = this.allBooks.filter(book => {

      const categoryMatch =
        this.selectedCategory === 'ALL' ||
        book.category === this.selectedCategory;

      const statusMatch =
        this.selectedStatus === 'ALL' ||
        (this.selectedStatus === 'true' && book.quantity > 0) ||
        (this.selectedStatus === 'false' && book.quantity <= 0);

      return categoryMatch && statusMatch;
    });
  }

  loadBooks() {
    this.store.dispatch(
      BookActions.loadBooks({
        page: this.page,
        size: this.size
      })
    )
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.page++;
      this.loadBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page--;
      this.loadBooks();
    }
  }

  viewBook(book: Book) {
    this.dialog.open(BookViewDialogComponent, {
      width: '600px', data: book
    })
  }
}
