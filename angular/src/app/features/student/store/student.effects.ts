import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { StudentService } from '../services/student.service';
import * as StudentActions from './student.actions';
import { catchError, map, of, switchMap } from 'rxjs';


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
    ))
}
