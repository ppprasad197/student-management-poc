import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';



export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auths': emptyProps(),
  }
});

export const login = createAction(
  '[Auth] Login',
  props<{ username: string, password: string }>()
);


export const loginSuccess = createAction(

  '[Auth] Login Success',

  props<{ user: string }>()

);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const signUp = createAction(
  '[Auth] Signup',
  props<{
    data: any;
  }>()
);

export const signupSuccess = createAction(
  '[Auth]Signup Success',
  props<{ response: any }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: any }>()
);


export const getCurrentUser = createAction(
  '[Auth] Get Current User'
);

export const getCurrentUserSuccess = createAction(

  '[Auth] Get Current User Success',

  props<{ user: User }>()

);


export const getCurrentUserFailure = createAction(
  '[Auth] Get Current User Failure',
  props<{ error: string }>()
);
