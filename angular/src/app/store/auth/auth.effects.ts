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
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((response) => (
            AuthActions.loginSuccess({ user: response.username })
          ),
            catchError(() =>
              of(AuthActions.loginFailure({ error: 'Invalid credentials' }))
            )
          )
        )
      )
    )
  );

  // loginSuccess = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(AuthActions.loginSuccess),
  //       tap(() => {
  //         this.router.navigate(['/home']);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  loginSuccess = createEffect(
    () =>
      this.actions.pipe(

        ofType(AuthActions.loginSuccess),

        tap(() => {

          this.store.dispatch(
            AuthActions.getCurrentUser()
          );

        }),

        tap(() => {

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
            AuthActions.signupSuccess({ response })
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
        this.router.navigate(['/student']);
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
}
