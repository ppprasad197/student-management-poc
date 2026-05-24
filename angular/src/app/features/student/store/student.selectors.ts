import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.state';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectStudents = createSelector(
    selectStudentState,
    (state) => state.students
);

export const selectLoading = createSelector(
    selectStudentState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectStudentState,
    (state) => state.error
);

export const selectStudentSuccessMessage = createSelector(
    selectStudentState,
    (state) => state.successMessage
);