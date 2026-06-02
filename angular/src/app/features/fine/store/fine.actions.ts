import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { FinePaymentResponse, FineResponse, FineSummary } from '../models/fine.model';
import { AdminFine } from '../../user/models/adminFine.model';

export const loadMyFines = createAction(
  '[Fine]Load My Fines'
);

export const loadMyFinesSuccess = createAction(
  '[Fine]Load My Fines Success',
  props<{ fines: FineResponse }>()
);


export const loadMyFinesFailure = createAction(
  '[Fine]Load My Fines Failure',
  props<{ error: string }>()
);

export const loadFineSummary = createAction(
  '[Fine]Load Fine Summary'
);

export const loadFineSummarySuccess = createAction(
  '[Fine]Load Fine Summary Success',
  props<{ summary: FineSummary }>()
);

export const loadFineSummaryFailure = createAction(
  '[Fine] Load Fine Summary Failure',
  props<{ error: string }>()
);

export const payFine = createAction(
  '[Fine] Pay Fine',
  props<{ amount: number }>()
);

export const payFineSuccess = createAction(
  '[Fine] Pay Fine Success',
  props<{ response: FinePaymentResponse }>()
);


export const payFineFailure = createAction(
  '[Fine] Pay Fine Failure',
  props<{ error: string }>()
);

export const loadAllStudentFines = createAction(
  '[Fine] Load All Student Fines'
);

export const loadAllStudentFinesSuccess = createAction(
  '[Fine] Load All Student Fines Success',
  props<{ fines: AdminFine[] }>()
);

export const loadAllStudentFinesFailure = createAction(
  '[Fine] Load All Student Fines Failure',
  props<{ error: string }>()
);


