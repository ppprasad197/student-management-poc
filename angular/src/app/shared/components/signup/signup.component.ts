import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // signupForm: FormGroup
  // userRole: string = '';

  // constructor(private fb: FormBuilder) {
  //   this.signupForm = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     userName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //     role: ['LIBRARIAN', Validators.required],
  //     studentId: ['']
  //   });
  // }

  userRole = 'LIBRARIAN';

  constructor(private store: Store) { }

  signupData = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    studentId: ''
  };

  signup() {
    console.log("studentID : " + this.signupData.studentId);
    console.log("studentID : " + this.signupData.userName);
    console.log("email : " + this.signupData.email);
    this.store.dispatch(AuthActions.signUp({
      role: this.userRole,
      data: this.signupData
    }));
  }



}
