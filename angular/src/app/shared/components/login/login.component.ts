import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectAuthState from '../../../store/auth/auth.selectors';
import * as AuthActions from '../../../store/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private store = inject(Store);

  username = ''
  password = ''

  error = this.store.select(selectAuthState.selectError)

  login() {
    console.log(this.username)
    console.log(this.password)
    this.store.dispatch(
      AuthActions.login({
        username: this.username,
        password: this.password
      })
    );
  }


}
