import { inject, Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import * as FineActions from '../store/fine.actions';
// import { catchError, map, of, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FineService } from '../services/fine.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { PopupService } from '../../../shared/services/popup.service';

@Injectable()
export class FineEffects {


  private actions = inject(Actions);
  private fineService = inject(FineService);
  private notification = inject(NotificationService);
  private popup = inject(PopupService);

  constructor() { }

  loadMyFines = createEffect(() =>
    this.actions.pipe(
      ofType(FineActions.loadMyFines),
      switchMap(() =>
        this.fineService.getMyFines().pipe(
          map((fines) =>
            FineActions.loadMyFinesSuccess({
              fines
            })
          ),
          catchError((error) =>
            of(
              FineActions.loadMyFinesFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  loadSummary = createEffect(() =>
    this.actions.pipe(
      ofType(FineActions.loadFineSummary),
      switchMap(() =>
        this.fineService.getSummary().pipe(
          map((summary) =>
            FineActions.loadFineSummarySuccess({
              summary
            })
          ),
          catchError((error) =>
            of(
              FineActions.loadFineSummaryFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  payFine = createEffect(() =>
    this.actions.pipe(
      ofType(FineActions.payFine),
      switchMap(({ amount }) =>
        this.fineService.payFine(amount).pipe(
          map((response) =>
            FineActions.payFineSuccess({
              response
            })
          ),
          catchError((error) =>
            of(
              FineActions.payFineFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  payFineSuccessAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(FineActions.payFineSuccess),
        tap(() => this.popup.openSuccess('Fine paid Successfully'))
      ),
    { dispatch: false }
  );

  payFineFailureAlert = createEffect(
    () =>
      this.actions.pipe(
        ofType(FineActions.payFineFailure),
        tap(({ error }) =>
          this.popup.openError(error || 'Failed to approve user')
        )
      ),
    { dispatch: false }
  );

  loadAllStudentFines = createEffect(() =>
    this.actions.pipe(
      ofType(FineActions.loadAllStudentFines),
      switchMap(() =>
        this.fineService.getAllStudentFines().pipe(
          map((fines) =>
            FineActions
              .loadAllStudentFinesSuccess({
                fines
              })
          ),
          catchError((error) =>
            of(
              FineActions
                .loadAllStudentFinesFailure({
                  error: error.message
                })
            )
          )
        )
      )
    )
  );

  reloadFineData = createEffect(() =>
    this.actions.pipe(
      ofType(FineActions.payFineSuccess),
      switchMap(() => [
        FineActions.loadMyFines(),
        FineActions.loadFineSummary()
      ])
    )
  )
}
