import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models/student.model';
import { catchError } from 'rxjs';

export const loadStudents = createAction(
  '[Student]Load Students',
  props<{ page: number; size: number }>()
);

export const loadStudentsSuccess = createAction(
  '[Student]Load Student Success',
  props<{
    students: Student[],
    currentPage: number,
    totalPages: number
  }>()
);

export const loadStudentsFailure = createAction(
  '[Student]Load Student Failure',
  props<{ error: string }>()
);

export const approveStudent = createAction(
  '[Student]Approve Student',
  props<{ id: number }>()
);

export const approveStudentSuccess = createAction(
  '[Student] Approve Student Success',
  props<{ id: number }>()
);

export const approveStudentFailure = createAction(
  '[Student] Approve Student Failure',
  props<{ error: string }>()
);

export const deleteStudent = createAction(
  '[Student]Delete Student',
  props<{ id: number }>()
);

export const updateStudent = createAction(
  '[Student]Update Student',
  props<{ id: number, student: Partial<Student> }>()
);

export const getStudent = createAction(
  '[Student]Get Student',
  props<{ id: number }>()
);

export const deleteStudentSuccess = createAction(
  '[Student]Delete Student Success'
);

export const deleteStudentFailure = createAction(
  '[Student]Delete Student Failure',
  props<{ error: string }>()
);

export const updateStudentSuccess = createAction(
  '[Student]Update Student Success',
  props<{ message: string }>()
);

export const updateStudentFailure = createAction(
  '[Student]Update Student Failure',
  props<{ error: string }>()
);

export const clearMessages = createAction(
  '[Student] Clear Messages'
);

export const setCurrentPage = createAction(
  '[Student]Set Current Page',
  props<{ page: number }>()
)