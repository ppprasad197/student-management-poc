import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as StudentActions from '../../../features/student/store/student.actions';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private store: Store) { }

  signupData = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: ''
  };

  private student = history.state.student;
  isUpdateMode = false;
  studentId!: number;

  ngOnInit(): void {
    this.isUpdateMode = true;
    this.studentId = this.student.id;

    if (this.student) {
      this.signupData = {
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        userName: this.student.userName,
        email: this.student.email,
        password: '',
        role: this.student.role
      };
    }
  }

  signup() {

    if (this.isUpdateMode) {
      this.store.dispatch(StudentActions.updateStudent({
        id: this.studentId,
        student: this.signupData
      }));
    } else {
      this.store.dispatch(AuthActions.signUp({
        data: this.signupData
      }));
    }
  }
}
