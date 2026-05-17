import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FineActions from '../store/fine.actions';
// import { catchError, map, of, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FineService } from '../services/fine.service';

@Injectable()
export class FineEffects {


  private actions$ = inject(Actions);
  private fineService = inject(FineService);

  constructor() {
    console.log('actions$', this.actions$);
  }


  loadMyFines = createEffect(() =>

    this.actions$.pipe(

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

    this.actions$.pipe(

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

    this.actions$.pipe(

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

  reloadAfterPayment = createEffect(() =>

    this.actions$.pipe(

      ofType(FineActions.payFineSuccess),

      map(() =>

        FineActions.loadMyFines()

      )

    )

  );

  loadAllStudentFines = createEffect(() =>
    this.actions$.pipe(
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
}
