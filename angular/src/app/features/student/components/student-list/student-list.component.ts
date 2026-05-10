import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectStudentState from '../../store/student.selectors';
import * as StudentSelectos from '../../store/student.selectors';
import * as StudentActions from '../../store/student.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  private store = inject(Store);

  students = this.store.select(
    selectStudentState.selectStudents
  );

  ngOnInit(): void {
    this.store.dispatch(
      StudentActions.loadStudents()
    );
  }

  approveStudent(id: number) {
    this.store.dispatch(
      StudentActions.approveStudent({ id })
    );
  }

  deleteStudent(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student??'
    );

    if (confirmed) {
      this.store.dispatch(StudentActions.deleteStudent({ id }));;
    }

  }

}
