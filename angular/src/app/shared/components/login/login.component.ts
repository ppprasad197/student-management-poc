import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectAuthState from '../../../store/auth/auth.selectors';
import * as AuthActions from '../../../store/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private store = inject(Store);
  private router = inject(Router);

  username = '';
  password = '';

  login() {
    this.store.dispatch(
      AuthActions.login({
        username: this.username,
        password: this.password
      })
    );
  }
}
