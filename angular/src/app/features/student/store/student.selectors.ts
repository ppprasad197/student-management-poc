import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.state';
import { state } from '@angular/animations';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectStudents = createSelector(
    selectStudentState,
    (state) => state.students
);

export const selectStudentPage =
    createSelector(
        selectStudentState,
        state => ({
            students: state.students,
            currentPage: state.currentPage,
            totalPages: state.totalPages
        })
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

export const selectCurrentPage = createSelector(
    selectStudentState,
    state => state.currentPage
);