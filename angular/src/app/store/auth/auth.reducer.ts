import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../core/models/auth.model';

export const authFeatureKey = 'auth';

export interface State {

}

export const initialState: AuthState = {

  user: null,

  loading: false,

  error: null
};

export const authReducer = createReducer(

  initialState,

  // LOGIN

  on(AuthActions.login, (state) => ({

    ...state,

    loading: true,

    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({

    ...state,

    user,

    loading: false,

    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({

    ...state,

    loading: false,

    error
  })),



  // SIGNUP

  on(AuthActions.signUp, (state) => ({

    ...state,

    loading: true,

    error: null
  })),

  on(AuthActions.signupSuccess, (state) => ({

    ...state,

    loading: false,

    error: null
  })),

  on(AuthActions.signupFailure, (state, { error }) => ({

    ...state,

    loading: false,

    error
  }))
);

