import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';



@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  login = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              user: response.username,
              message: 'Login Successful'
            })
          ),
          catchError((error) => {
            console.log(error);
            console.log(error.error);

            return of(
              AuthActions.loginFailure({
                error:
                  error.error?.error ||
                  error.error?.message ||
                  error.message ||
                  'Invalid credentials'
              })
            );
          })
        )
      )
    )
  );

  logout = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => {
            console.log("logout success");
            return AuthActions.logoutSuccess();
          }
          )
        )
      )
    )
  );

  logoutSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        console.log("Successfull now rendering to login page");
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  loginSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.store.dispatch(
          AuthActions.getCurrentUser()
        );

        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  signup = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ data }) =>
        this.authService.signupUser(data).pipe(
          map((response) =>
            AuthActions.signupSuccess({ response, message: "User sign up successfull" })
          ),
          catchError((error) =>
            of(
              AuthActions.signupFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  signupSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.signupSuccess),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  getCurrentUser = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) =>
            AuthActions.getCurrentUserSuccess({
              user
            })
          ),
          catchError((error) =>
            of(
              AuthActions.getCurrentUserFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  loginSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ message }) => alert(message))
      ),
    { dispatch: false }
  );

  loginFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => alert(error))
      ),
    { dispatch: false }
  );
}
