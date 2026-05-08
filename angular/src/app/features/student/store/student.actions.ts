import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models/student.model';
import { catchError } from 'rxjs';

export const loadStudents = createAction(
  '[Student]Load Students'
);

export const loadStudentsSuccess = createAction(
  '[Student]Load Student Success',
  props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Student]Load Student Failure',
  props<{ error: string }>()
);

export const approveStudent = createAction(
  '[Student]Approve Student',
  props<{ id: number }>()
);

export const deleteStudent = createAction(
  '[Student]Delete Student',
  props<{ id: number }>()
);

export const updateStudent = createAction(
  '[Student]Update Student',
  props<{ id: number, student: Student }>()
);
