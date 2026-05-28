import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../core/models/auth.model';
import { User } from '../../core/models/user.model';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  username: null,
  user: null,
  loading: false,
  error: null,
  successMessage: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    username: user,
    loading: false,
    error: null
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    user: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(AuthActions.signUp, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.signupSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    error: null,
    successMessage: message
  })),

  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.getCurrentUserSuccess,
    (state, { user }) => ({
      ...state,
      user
    })),

  on(AuthActions.clearAuthMessages, (state) => ({
    ...state,
    error: null,
    successMessage: null
  }))
);

