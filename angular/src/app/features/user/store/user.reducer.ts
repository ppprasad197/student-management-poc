import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

export const userFeatureKey = 'user';

export const initialState: UserState = {
  users: [],
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
    (state, { users }) => ({
      ...state,
      users,
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

  // on(UserActions.approveUserSuccess,
  //   (state, { user }) => ({
  //     ...state,
  //     users: state.users.map((u) =>
  //       u.id === user.id
  //         ? user
  //         : u
  //     )
  //   })
  // ),

  on(UserActions.approveUserSuccess, (state) => ({
    ...state,
    successMessage: 'User approved successfully'
  })),

  // on(UserActions.deleteUserSuccess,
  //   (state, { id }) => ({
  //     ...state,
  //     users: state.users.filter(
  //       (u) => u.id !== id
  //     )
  //   })
  // ),

  on(UserActions.deleteUserSuccess, (state) => ({
    ...state,
    successMessage: 'User deleted successfully'
  })),

  // on(UserActions.updateUserSuccess,
  //   (state, { user }) => ({
  //     ...state,
  //     users: state.users.map((u) =>
  //       u.id === user.id
  //         ? user
  //         : u
  //     )
  //   })
  // )

  on(UserActions.updateUserSuccess, (state) => ({
    ...state,
    successMessage: 'User updated successfully'
  })),
  
  on(UserActions.clearMessages, (state) => ({
    ...state,
    successMessage: null,
    error: null
  }))

);

