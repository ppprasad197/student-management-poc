import { Component, Inject } from '@angular/core';
import { Student } from '../../../features/student/models/student.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-view-dialog',
  standalone: true,
  imports: [],
  templateUrl: './student-view-dialog.component.html',
  styleUrl: './student-view-dialog.component.css'
})
export class StudentViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public student: Student) { }
  }
