import { createReducer, on } from '@ngrx/store';
import * as StudentActions from './student.actions';
import { StudentState } from './student.state';

export const studentFeatureKey = 'student';

export interface State {

}

export const initialState: StudentState = {
  students: [],
  loading: false,
  error: null
};

export const studentReducer = createReducer(
  initialState,

  on(StudentActions.loadStudents, (state) => ({
    ...state,
    loading: true
  })),

  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    loading: false,
    students: students
  })),

  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

