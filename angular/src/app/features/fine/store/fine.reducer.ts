import { createReducer, on } from '@ngrx/store';
import * as  FineActions from './fine.actions';
import { FineState } from './fine.state';

export const fineFeatureKey = 'fines';


export const initialState: FineState = {
  fines: null,
  summary: null,
  loading: false,
  error: null
};

export const fineReducer = createReducer(
  initialState,

  on(FineActions.loadMyFines, (state) => ({
    ...state,
    loading: true
  })),

  on(FineActions.loadMyFinesSuccess, (state, { fines }) => ({
    ...state,
    fines,
    loading: false
  })),

  on(

    FineActions.loadFineSummarySuccess,

    (state, { summary }) => ({

      ...state,

      summary

    })

  ),

  on(

    FineActions.payFineSuccess,

    (state) => ({

      ...state,

      loading: false

    })

  ),

  on(FineActions.loadMyFinesFailure, FineActions.loadFineSummaryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

