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
import { Student } from '../../models/student.model';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentViewDialogComponent } from '../../../../shared/dialogs/student-view-dialog/student-view-dialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  private store = inject(Store);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  borrowedBooks: BorrowedBook[] = [];

  selectedStatus = 'ALL';

  allStudents: Student[] = [];

  filteredStudents: Student[] = [];

  students = this.store.select(
    selectStudentState.selectStudentPage
  );

  borrowedBooks$ = this.store.select(
    selectBookState.selectBorrowedBooks
  );

  currentPage = 0;
  totalPages = 0;

  page = 0;
  size = 5;

  ngOnInit(): void {

    this.store.select(selectStudentState.selectCurrentPage).pipe(first())
      .subscribe(page => {
        this.page = page ?? 0;
        this.loadStudents();
      });

    this.loadStudents();
    this.students.subscribe(response => {
      this.allStudents = response.students;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
      this.filterStudents();
    });

    this.store.dispatch(
      StudentActions.clearMessages()
    );

    this.store.dispatch(
      StudentActions.loadStudents({
        page: this.page,
        size: this.size
      })
    );

    this.store.dispatch(
      BookActions.loadBorrowedBooks()
    );

    this.borrowedBooks$
      .subscribe(data => {
        this.borrowedBooks = data;
      });
  }

  filterStudents(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredStudents = [...this.allStudents];
      return;
    }

    this.filteredStudents = this.allStudents.filter(
      student => student.userStatus === this.selectedStatus
    );
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

  loadStudents() {
    this.store.dispatch(
      StudentActions.loadStudents({
        page: this.page,
        size: this.size
      })
    )
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.page++;
      this.loadStudents();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page--;
      this.loadStudents();
    }
  }

  viewStudent(student: Student) {
    this.dialog.open(StudentViewDialogComponent,
      {
        width: '600px', data: student
      }
    )
  }

}
