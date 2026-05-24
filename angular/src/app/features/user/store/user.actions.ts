import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

export const approveUser = createAction(
  '[User] Approve User',
  props<{ id: number }>()
);

export const approveUserSuccess = createAction(
  '[User] Approve User Success',
  props<{ id: number }>()
);

export const approveUserFailure = createAction(
  '[User] Approve User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ id: number, user: Partial<User> }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success'
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

export const clearMessages = createAction(
  '[User] Clear Messages'
);  
