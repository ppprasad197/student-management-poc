import { createReducer, on } from '@ngrx/store';
import * as StudentActions from './student.actions';
import { StudentState } from './student.state';

export const studentFeatureKey = 'student';

export const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  successMessage: null
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
    students: students,
    successMessage: 'Student updated successfully'
  })),

  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students: [...students],
    loading: false
  })),

  on(StudentActions.deleteStudentSuccess, (state) => ({
    ...state,
    successMessage: 'Student deleted successfully',
    error: null
  })),

  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    error,
    successMessage: null
  })),

  on(StudentActions.updateStudent, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(StudentActions.approveStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.map(student =>
      student.id === id
        ? {
          ...student,
          userStatus: 'APPROVED' as 'APPROVED'
        }
        : student
    ),
    successMessage: 'Student approved successfully',
    error: null
  })),

  on(StudentActions.approveStudentFailure, (state, { error }) => ({

    ...state,

    error,

    successMessage: null

  })),

  on(StudentActions.clearMessages, (state) => ({

    ...state,

    successMessage: null,

    error: null

  })),

);

