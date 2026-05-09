import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

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

