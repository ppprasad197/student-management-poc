import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as BookActions from '../../store/book.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { filter, first } from 'rxjs';
import * as BookSelectors from '../../store/book.selectors';


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
    available: true
  };

  private book = history.state.book;

  constructor(private store: Store, private router: Router) { }

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
        available: this.book.available
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
    this.router.navigate(['/book']);
  }
}
