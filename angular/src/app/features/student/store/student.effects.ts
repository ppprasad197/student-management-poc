import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { StudentService } from '../services/student.service';
import * as StudentActions from './student.actions';
import { catchError, delay, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { Store } from '@ngrx/store';
import * as selectStudentState from '../../student/store/student.selectors';
import { PopupService } from '../../../shared/services/popup.service';


@Injectable()
export class StudentEffects {
  private actions = inject(Actions);
  private store = inject(Store);

  constructor(private studentService: StudentService, private router: Router,
    private notification: NotificationService, private popup: PopupService) { }

  loadStudents = createEffect(() =>
    this.actions.pipe(
      ofType(StudentActions.loadStudents),
      switchMap(({ page, size }) =>
        this.studentService.getStudents(page, size).pipe(
          map((response) =>
            StudentActions.loadStudentsSuccess({
              students: response.students,
              currentPage: response.currentPage,
              totalPages: response.totalPages
            })
          ),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({
              error: error.message
            })))
        ))
    ));

  approveStudent = createEffect(() =>
    this.actions.pipe(
      ofType(StudentActions.approveStudent),
      switchMap(({ id }) =>
        this.studentService.approveStudent(id).pipe(
          map(() => {
            return StudentActions.approveStudentSuccess({ id });
          }),
          catchError((error) =>
            of(
              StudentActions.approveStudentFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  updateStudent = createEffect(() =>
    this.actions.pipe(
      ofType(StudentActions.updateStudent),
      switchMap(({ id, student }) =>
        this.studentService.updateStudent(
          id,
          student
        ).pipe(
          map(() =>
            StudentActions.updateStudentSuccess({
              message: "Student updated successfully"
            }),
          ),
          catchError((error) =>
            of(
              StudentActions.updateStudentFailure({
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
            StudentActions.deleteStudentSuccess()
          ),
          catchError((error) =>
            of(
              StudentActions.deleteStudentFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  reloadStudents = createEffect(() =>
    this.actions.pipe(
      ofType(
        StudentActions.approveStudentSuccess,
        StudentActions.deleteStudentSuccess,
        StudentActions.updateStudentSuccess
      ),
      withLatestFrom(
        this.store.select(selectStudentState.selectCurrentPage)
      ), map(([action, currentPage]) =>
        StudentActions.loadStudents({
          page: currentPage,
          size: 5
        })
      )
    ));

  approveStudentSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudentActions.approveStudentSuccess),
        tap(() => this.popup.openSuccess('Student Approved Successfully'))
      ),
    { dispatch: false }
  );

  deleteStudentSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudentActions.deleteStudentSuccess),
        tap(() => this.popup.openSuccess('Student Deleted Successfully'))
      ),
    { dispatch: false }
  );

  updateStudentSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudentActions.updateStudentSuccess),
        tap(({ message }) => { this.popup.openSuccess(message), this.router.navigate(['/student']); })
      ),
    { dispatch: false }
  );

  approveStudentFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudentActions.approveStudentFailure),
        tap(({ error }) => this.popup.openError(error))
      ),
    { dispatch: false }
  );

  deleteStudentFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudentActions.deleteStudentFailure),
        tap(({ error }) => this.popup.openError(error))
      ),
    { dispatch: false }
  );

  updateStudentFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudentActions.updateStudentFailure),
        tap(({ error }) => this.popup.openError(error))
      ),
    { dispatch: false }
  );
}
