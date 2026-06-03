import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StudentActions from '../../store/student.actions';
import { CommonModule, Location } from '@angular/common';
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

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.student = history.state.student;
  }

  goBack() {
    this.location.back();
  }
}
