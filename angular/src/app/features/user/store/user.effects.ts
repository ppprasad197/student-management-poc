import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../store/user.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Route, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { Store } from '@ngrx/store';
import * as selectUserState from './user.selectors';
import { PopupService } from '../../../shared/services/popup.service';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  private store = inject(Store);
  constructor(private userService: UserService, private router: Router,
    private notification: NotificationService, private popup: PopupService) { }

  loadUsers = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loadUsers),
      switchMap(({ page, size }) =>
        this.userService.getAllUsers(page, size).pipe(
          map((response) =>
            UserActions.loadUsersSuccess({
              users: response.users,
              currentPage: response.currentPage,
              totalPages: response.totalPages
            })
          ),
          catchError(error =>
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
      withLatestFrom(
        this.store.select(selectUserState.selectCurrentPage)
      ),
      map(([action, currentPage]) =>
        UserActions.loadUsers({
          page: currentPage,
          size: 5
        })
      )
    )
  );

  approveUserSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.approveUserSuccess),
        tap(() => this.popup.openSuccess('User Approved Successfully'))
      ),
    { dispatch: false }
  );

  deleteUserSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.deleteUserSuccess),
        tap(() => this.popup.openSuccess('User Deleted Successfully'))
      ),
    { dispatch: false }
  );

  updateUserSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          this.popup.openSuccess('User Updated Successfully');
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
          this.popup.openError(error || 'Failed to approve user')
        )
      ),
    { dispatch: false }
  );

  deleteUserFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.deleteUserFailure),
        tap(({ error }) =>
          this.popup.openError(error || 'Failed to delete user')
        )
      ),
    { dispatch: false }
  );

  updateUserFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActions.updateUserFailure),
        tap(({ error }) =>
          this.popup.openError(error || 'Failed to update user')
        )
      ),
    { dispatch: false }
  );
      
}
