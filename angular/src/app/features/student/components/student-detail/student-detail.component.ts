import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StudentActions from '../../store/student.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent {
  student: any;
  ngOnInit(): void {
    this.student = history.state.student;
  }
}
