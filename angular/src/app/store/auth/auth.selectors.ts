import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../core/models/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectLoading = createSelector(
    selectAuthState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectAuthState,
    (state) => state.error
);

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectSuccessMessage = createSelector(
  selectAuthState,
  (state) => state.successMessage
);

export const selectErrorMessage = createSelector(
  selectAuthState,
  (state) => state.error
);