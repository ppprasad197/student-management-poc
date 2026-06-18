import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as BookActions from '../../store/book.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { filter, first } from 'rxjs';
import * as BookSelectors from '../../store/book.selectors';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PopupService } from '../../../../shared/services/popup.service';


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  isUpdateMode = false;
  bookId!: number;

  bookData: Book = {
    id: 0,
    title: '',
    author: '',
    category: '',
    description: '',
    quantity: 0,
    available: true,
    isDeleted: false
  };

  private book = history.state.book;

  constructor(private store: Store, private router: Router,
    private notification: NotificationService, private popup: PopupService) { }

  ngOnInit() {
    if (this.book) {
      this.isUpdateMode = true;
      this.bookId = this.book.id;
      this.bookData = {
        id: this.book.id,
        title: this.book.title,
        author: this.book.author,
        category: this.book.category,
        description: this.book.description,
        quantity: this.book.quantity,
        available: this.book.available,
        isDeleted: false
      };
    }
  }

  submitBook() {
    if (this.isUpdateMode) {
      this.store.dispatch(
        BookActions.updateBook({
          id: this.bookId,
          book: this.bookData
        })
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
          this.store.dispatch(
            BookActions.clearBookMessages()
          )
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
          this.store.dispatch(
            BookActions.clearBookMessages()
          )
        });
    }
    else {
      this.store.dispatch(
        BookActions.addBook({
          book: this.bookData
        })
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
          this.store.dispatch(
            BookActions.clearBookMessages()
          )
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
          this.store.dispatch(
            BookActions.clearBookMessages()
          )
        });
    }
    this.router.navigate(['/book']);
  }
}
