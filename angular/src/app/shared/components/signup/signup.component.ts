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

  isUpdateMode: boolean = false;

  studentId!: number;

  signupData = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: ''
  };

  ngOnInit(): void {

    const student = history.state.student;

    if (student && student.id) {

      this.isUpdateMode = true;

      this.studentId = student.id;

      this.signupData = {

        firstName: student.firstName,
        lastName: student.lastName,
        userName: student.userName,
        email: student.email,
        password: '',
        role: student.role

      };

    }

  }

  signup() {

    if (this.isUpdateMode) {

      this.store.dispatch(
        StudentActions.updateStudent({
          id: this.studentId,
          student: this.signupData
        })
      );

    } else {

      this.store.dispatch(
        AuthActions.signUp({
          data: this.signupData
        })
      );

    }

  }
}
