import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectStudentState from '../../store/student.selectors';
import * as selectBookState from '../../../book/store/book.selectors';
import * as StudentSelector from '../../store/student.selectors';
import * as StudentActions from '../../store/student.actions';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { filter, first } from 'rxjs';
import * as BookActions from '../../../book/store/book.actions';
import { BorrowedBook } from '../../../book/models/borrowed-book.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  private store = inject(Store);
  private router = inject(Router);

  borrowedBooks: BorrowedBook[] = [];

  students = this.store.select(
    selectStudentState.selectStudents
  );

  borrowedBooks$ = this.store.select(
    selectBookState.selectBorrowedBooks
  );

  ngOnInit(): void {

    this.store.dispatch(
      StudentActions.clearMessages()
    );

    this.store.dispatch(
      StudentActions.loadStudents()
    );

    this.store.dispatch(
      BookActions.loadBorrowedBooks()
    );

    this.borrowedBooks$
      .subscribe(data => {
        this.borrowedBooks = data;
      });

  }

  approveStudent(id: number): void {
    this.store.dispatch(
      StudentActions.approveStudent({ id })
    );
  }

  deleteStudent(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (confirmed) {
      this.store.dispatch(
        StudentActions.deleteStudent({ id })
      );
    }
  }

  hasBorrowedBooks(studentId: number): boolean {
    return this.borrowedBooks.some(
      book => book.studentId === studentId
    );
  }

}
