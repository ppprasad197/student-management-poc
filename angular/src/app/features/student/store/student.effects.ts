import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { StudentService } from '../services/student.service';
import * as StudentActions from './student.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';


@Injectable()
export class StudentEffects {

  private actions = inject(Actions);

  constructor(private studentService: StudentService) { }

  loadStudents = createEffect(() =>
    this.actions.pipe(
      ofType(StudentActions.loadStudents),
      switchMap(() =>
        this.studentService.getStudents().pipe(
          map((students) =>
            StudentActions.loadStudentsSuccess({ students })
          ),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({
              error: error.message
            })))
        ))
    ));


  approveUser = createEffect(() =>
    this.actions.pipe(
      ofType(StudentActions.approveStudent),
      switchMap(({ id }) =>
        this.studentService.approveStudent(id).pipe(
          map(() =>
            StudentActions.approveStudentSuccess()
          ),

          catchError((error) =>
            of(StudentActions.approveStudentFailure({
              error: error.message
            })))
        )
      )
    )
  );

  approveStudentSuccess$ = createEffect(() =>
    this.actions.pipe(

      ofType(StudentActions.approveStudentSuccess),

      map(() =>
        StudentActions.loadStudents()
      )
    )
  );

  updateStudent = createEffect(() =>

    this.actions.pipe(

      ofType(StudentActions.updateStudent),

      switchMap(({ id, student }) =>

        this.studentService.updateStudent(id, student).pipe(

          map(() =>
            StudentActions.loadStudents()
          ),

          catchError((error) =>
            of(
              StudentActions.loadStudentsFailure({
                error: error.message
              })
            )
          )

        )

      )

    )

  );

  deleteStudent = createEffect(() =>
    this.actions.pipe(
      ofType(StudentActions.deleteStudent),
      switchMap(({ id }) =>
        this.studentService.deleteStudent(id).pipe(
          map(() =>
            StudentActions.loadStudents()
          ),

          catchError((error) =>
            of(StudentActions.loadStudentsFailure({
              error: error.message
            })))

        )
      )
    )
  );

}
