import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as StudentActions from '../../../features/student/store/student.actions';
import { Router } from '@angular/router';
import * as UserActions from '../../../features/user/store/user.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private store: Store, private router: Router) { }

  isUpdateMode: boolean = false;
  isUserUpdate: boolean = false;
  studentId!: number;
  userId!: number;

  signupData = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: '',
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
        role: student.role,
      };
    }

    // USER UPDATE

    const user = history.state.user;
    if (user && user.id) {
      this.isUserUpdate = true;
      this.userId = user.id;
      this.signupData = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: '',
        role: user.role
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
    } else if (this.isUserUpdate) {
      this.store.dispatch(UserActions.updateUser({
        id: this.userId,
        user: this.signupData
      }));
    }

    else {
      this.store.dispatch(
        AuthActions.signUp({
          data: this.signupData
        })
      );
    }
  }

}
