import {ILoginState} from '../../common/interfaces';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import * as loginAction from '../actions/user.action';

const initialState: ILoginState = {
  isLogin: false,
  user: null,
};

const loginReducer: ActionReducer<ILoginState> = createReducer(
  initialState,
  on(loginAction.userSignOut, state => ({...state, isLogin: false, user: null})),
  on(loginAction.userSignInSuccess, (state, { user }) => (
    {
      ...state,
      isLogin: true,
      user
    }
  ))
);

export function reducer(state: ILoginState, action: Action): ILoginState {
  return loginReducer(state, action);
}

export const getLoginStatus = (state: ILoginState) => state.isLogin;
export const getUser = (state: ILoginState) => state.user;
