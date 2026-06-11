import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

export const userFeatureKey = 'user';

export const initialState: UserState = {
  users: [],
  currentPage: 0,
  totalPages: 0,
  loading: false,
  error: null,
  successMessage: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers,
    (state) => ({
      ...state,
      loading: true
    })
  ),

  on(UserActions.loadUsersSuccess,
    (state, { users, currentPage, totalPages }) => ({
      ...state,
      users,
      currentPage,
      totalPages,
      loading: false,
    })
  ),

  on(UserActions.loadUsersFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false
    })
  ),

  on(UserActions.approveUserSuccess, (state) => ({
    ...state,
    successMessage: 'User approved successfully'
  })),

  on(UserActions.deleteUserSuccess, (state) => ({
    ...state,
    successMessage: 'User deleted successfully'
  })),

  on(UserActions.loadUsersSuccess,
    (state, { users, currentPage, totalPages }) => {
      return {
        ...state,
        users,
        currentPage,
        totalPages
      };
    }
  ),

  on(UserActions.clearMessages, (state) => ({
    ...state,
    successMessage: null,
    error: null
  })),

  on(UserActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page
  }))

);

