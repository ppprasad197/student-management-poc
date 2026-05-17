import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../store/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  constructor(
    private userService: UserService
  ) { }

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

          map((user) =>

            UserActions.approveUserSuccess({
              user
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
              UserActions.loadUsersFailure({
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

          map((updatedUser) =>

            UserActions.updateUserSuccess({
              user: updatedUser
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
}
