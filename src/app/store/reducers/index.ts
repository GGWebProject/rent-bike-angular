import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {IErrorState, ILoginState} from '../../common/interfaces';
import * as errorReducer from './error.reducer';
import * as loginReducer from './login.reducer';

export interface IState {
  errorState: IErrorState;
  loginState: ILoginState;
}

export const reducers: ActionReducerMap<IState> = {
  errorState: errorReducer.reducer,
  loginState: loginReducer.reducer,
};


export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

const getErrorState: any = (state: IState) => state.errorState;
const getLoginState: any = (state: IState) => state.loginState;

export const getError: any = createSelector(getErrorState, errorReducer.getError);
export const getErrorStatus: any = createSelector(getErrorState, errorReducer.getErrorStatus);

export const getUser: any = createSelector(getLoginState, loginReducer.getUser);
export const getLoginStatus: any = createSelector(getLoginState, loginReducer.getLoginStatus);
export const getAccessToken: any = createSelector(getLoginState, loginReducer.getAccessToken);
