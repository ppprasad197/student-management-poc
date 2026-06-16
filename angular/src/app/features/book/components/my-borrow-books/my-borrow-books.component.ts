import { Component, inject } from '@angular/core';
import * as BookActions from '../../store/book.actions';
import * as BookSelectors from '../../store/book.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { filter, first } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as  selectAuthState from '../../../../store/auth/auth.selectors';
import { BorrowedBook } from '../../models/borrowed-book.model';
import { BookService } from '../../services/book.service';

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
  private bookService = inject(BookService);

  currentUser = this.store.select(selectAuthState.selectCurrentUser);

  borrowedBooks = this.store.select(
    BookSelectors.selectMyBorrowedBooks
  ).subscribe(data => {
    this.books = data;
  });

  books: BorrowedBook[] = [];

  username = 'user';

  ngOnInit() {
    this.store.dispatch(
      BookActions.loadMyBorrowedBooks()
    );
    this.store.select(
      BookSelectors.selectMyBorrowedBooks
    ).subscribe(data => {
      this.books = data;
    });
    this.currentUser.subscribe(user => {
      if (user) {
        this.username = user.userName;
      }
    });
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

  exportToExcel() {

    const excelData = this.books.map(book => ({
      'Book Title': book.bookTitle,
      'Author': book.author,
      'Issue Date': book.issueDate,
      'Due Date': book.dueDate,
      'Student Id': book.studentId,
      'Renew count': book.renewCount,
      'Book Id': book.id
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: {
        'Borrowed Books': worksheet
      },
      SheetNames: ['Borrowed Books']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const data: Blob = new Blob(
      [excelBuffer],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    saveAs(
      data,
      `borrowed-books-${this.username}.xlsx`
    );
  }


  exportToExcelBE() {
    this.store.dispatch(
      BookActions.exportBorrowedBooks()
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
