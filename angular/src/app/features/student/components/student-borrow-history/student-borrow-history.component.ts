import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BorrowedBook } from '../../../book/models/borrowed-book.model';
import * as selectStudentState from '../../store/student.selectors';
import * as selectBookState from '../../../book/store/book.selectors';
import * as StudentActions from '../../store/student.actions';
import * as BookActions from '../../../book/store/book.actions';


@Component({
  selector: 'app-student-borrow-history',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-borrow-history.component.html',
  styleUrl: './student-borrow-history.component.css'
})
export class StudentBorrowHistoryComponent {
  private store = inject(Store);
  private router = inject(Router);

  studentId!: number;
  borrowedBooks: BorrowedBook[] = [];

  students = this.store.select(
    selectStudentState.selectStudents
  );

  borrowedBooks$ = this.store.select(
    selectBookState.selectBorrowedBooks
  );

  ngOnInit(): void {
    const student = history.state.student;
    this.studentId = student.id;
    this.store.dispatch(
      BookActions.loadBorrowedBooks()
    );
    this.borrowedBooks$.subscribe(data => {
      this.borrowedBooks = data.filter(
        book => book.studentId === this.studentId
      );
    });
  }
}
