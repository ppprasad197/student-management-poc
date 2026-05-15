import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FineState } from './fine.state';

export const selectFineState = createFeatureSelector<FineState>('fines');

export const selectMyFines = createSelector(
    selectFineState, (state) => state.fines
);

export const selectFineSummary =
    createSelector(

        selectFineState,

        (state) => state.summary

    );

export const selectFineLoading =
    createSelector(

        selectFineState,

        (state) => state.loading

    );

export const selectFineError =
    createSelector(

        selectFineState,

        (state) => state.error

    );

