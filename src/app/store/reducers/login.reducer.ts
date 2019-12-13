import {ILoginState} from '../../common/interfaces';
import {Action, ActionReducer, createReducer, on, State} from '@ngrx/store';
import * as loginAction from '../actions/user.action';

const initialState: ILoginState = {
  isLogin: false,
  accessToken: null,
  user: null,
};

const loginReducer: ActionReducer<ILoginState> = createReducer(
  initialState,
  on(loginAction.userSignOut, state => ({...state, isLogin: false, user: null, accessToken: null})),
  on(loginAction.userSaveAccessToken, (state, { payload: accessToken }) => ({...state, accessToken})),
  on(loginAction.userSignInSuccess, (state, { payload: user }) => ({...state, isLogin: true, user: {...user, password: null}}))
);

export function reducer(state: ILoginState, action: Action): ILoginState {
  return loginReducer(state, action);
}

export const getLoginStatus = (state: ILoginState) => state.isLogin;
export const getAccessToken = (state: ILoginState) => state.accessToken;
export const getUser = (state: ILoginState) => state.user;
