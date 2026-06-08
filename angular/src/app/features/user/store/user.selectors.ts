import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState =
    createFeatureSelector<UserState>('users');

export const selectUsers =
    createSelector(selectUserState, (state) => state.users);

export const selectUserPage =
    createSelector(
        selectUserState,
        state => ({
            users: state.users,
            currentPage: state.currentPage,
            totalPages: state.totalPages
        })
    );

export const selectUserSuccessMessage = createSelector(
    selectUserState,
    (state) => state.successMessage
);
export const selectError = createSelector(
    selectUserState,
    (state) => state.error
);

