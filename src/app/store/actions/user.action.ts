import {createAction, props} from '@ngrx/store';
import {User} from '../../common/entities';

const USER_SIGN_IN_SUCCESS: string = '[Login] Sign in is success';
const USER_SIGN_OUT: string = '[Login] Sign out';
const USER_SIGN_IN: string = '[User] Sign in';
const USER_REGISTRATION: string = '[User] Registration';
const USER_SAVE_ACCESS_TOKEN: string = '[User] Registration';

export const userRegistration = createAction(USER_REGISTRATION, props<{payload: User}>());
export const userSignIn = createAction(USER_SIGN_IN, props<{payload: User}>());
export const userSignInSuccess = createAction(USER_SIGN_IN_SUCCESS, props<{payload: User}>());
export const userSignOut = createAction(USER_SIGN_OUT);
export const userSaveAccessToken = createAction(USER_SAVE_ACCESS_TOKEN, props<{payload: string}>());
