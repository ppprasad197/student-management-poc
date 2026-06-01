import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../store/user.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  constructor(private userService: UserService, private router: Router) { }

  loadUsers = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) =>
            UserActions.loadUsersSuccess({
              users
            })
          ),
          catchError((error) =>
            of(
              UserActions.loadUsersFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  approveUser = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.approveUser),
      switchMap(({ id }) =>
        this.userService.approveUser(id).pipe(
          map(() =>
            UserActions.approveUserSuccess({
              id
            })
          ),
          catchError((error) =>
            of(
              UserActions.approveUserFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  deleteUser = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() =>
            UserActions.deleteUserSuccess({
              id
            })
          ),
          catchError((error) =>
            of(
              UserActions.deleteUserFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  updateUser = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ id, user }) =>
        this.userService.updateUser(
          id,
          user
        ).pipe(
          map(() => {
            return UserActions.updateUserSuccess({
              message: "User updated successfully"
            })
          }
          ),
          catchError((error) =>
            of(
              UserActions.updateUserFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  reloadUsers = createEffect(() =>
    this.actions.pipe(
      ofType(
        UserActions.approveUserSuccess,
        UserActions.deleteUserSuccess,
        UserActions.updateUserSuccess
      ),
      map(() =>
        UserActions.loadUsers()
      )
    )
  );

  approveUserSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.approveUserSuccess),
        tap(() => alert('User Approved Successfully'))
      ),
    { dispatch: false }
  );

  deleteUserSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.deleteUserSuccess),
        tap(() => alert('User Deleted Successfully'))
      ),
    { dispatch: false }
  );

  updateUserSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          alert('User Updated Successfully');
          this.router.navigate(['/users']);
        })
      ),
    { dispatch: false }
  );

  approveUserFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.approveUserFailure),
        tap(({ error }) =>
          alert(error || 'Failed to approve user')
        )
      ),
    { dispatch: false }
  );

  deleteUserFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.deleteUserFailure),
        tap(({ error }) =>
          alert(error || 'Failed to delete user')
        )
      ),
    { dispatch: false }
  );

  updateUserFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.updateUserFailure),
        tap(({ error }) =>
          alert(error || 'Failed to update user')
        )
      ),
    { dispatch: false }
  );

}
