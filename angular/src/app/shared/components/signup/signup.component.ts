import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as StudentActions from '../../../features/student/store/student.actions';
import { Router } from '@angular/router';
import * as UserActions from '../../../features/user/store/user.actions';
import { selectError } from '../../../store/auth/auth.selectors';
import { selectStudentSuccessMessage } from '../../../features/student/store/student.selectors';
import { selectUserState, selectUserSuccessMessage } from '../../../features/user/store/user.selectors';
import * as AuthSelectors from '../../../store/auth/auth.selectors';
import * as UserSelectors from '../../../features/user/store/user.selectors';
import * as StudentSelectors from '../../../features/student/store/student.selectors';

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
    this.isUpdateMode = false;
    this.isUserUpdate = false;
    const student = history.state.student;
    const user = history.state.user;
    // STUDENT UPDATE
    if (student?.id && !user) {
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

    // USER UPDATE
    else if (user?.id) {
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
    // UPDATE STUDENT
    if (this.isUpdateMode) {
      this.store.dispatch(
        StudentActions.updateStudent({
          id: this.studentId,
          student: { ...this.signupData }
        })
      );
    }

    // UPDATE USER
    else if (this.isUserUpdate) {
      this.store.dispatch(
        UserActions.updateUser({
          id: this.userId,
          user: { ...this.signupData }
        })
      );
    }

    // SIGNUP
    else {
      console.log('Frozen?', Object.isFrozen(this.signupData));
      this.store.dispatch(
        AuthActions.signUp({
          data: { ...this.signupData }
        })
      );

    }
  }
}
