import {createAction, props} from '@ngrx/store';
import {User} from '../../common/entities';

const LOGIN_SIGN_IN_SUCCESS: string = '[Login] Sign in success';
const LOGIN_SIGN_OUT: string = '[Login] Sign out';

export const loginSignInSuccess = createAction(LOGIN_SIGN_IN_SUCCESS, props<{user: User}>());
export const loginSignOut = createAction(LOGIN_SIGN_OUT);
