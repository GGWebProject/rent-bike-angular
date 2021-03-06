import {IErrorState} from '../../common/interfaces';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import * as errorAction from '../actions/error.action';

const initialState: IErrorState = {
  isError: false,
  appError: null
};

const errorReducer: ActionReducer<IErrorState> = createReducer(
  initialState,
  on(errorAction.errorSet, (state, { payload: appError }) => ({...state, appError, isError: true})),
  on(errorAction.errorRemove, (state) => ({...state, error: null, isError: false})),
);

export function reducer(state: IErrorState | undefined, action: Action): IErrorState {
  return errorReducer(state, action);
}

export const getErrorStatus: any = (state: IErrorState) => state.isError;
export const getError: any = (state: IErrorState) => state.appError;
