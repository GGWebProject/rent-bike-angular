import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/user.action';
import * as errorActions from '../actions/error.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {DataService} from '../../common/services/data.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {User} from '../../common/entities';
import {IAccessToken} from '../../common/interfaces/iaccess-token';
import * as jwt_decode from 'jwt-decode';
import {IJwtDecode} from '../../common/interfaces';

@Injectable()
export class UserEffect {
  public loginUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userSignIn),
      switchMap((action: {type: string; payload: User}) => {
        return this.dataService.loginUser(action.payload).pipe(
          map((accessToken: IAccessToken) => {
            return userActions.userSaveAccessToken({ payload: accessToken.accessToken });
          }),
          catchError(() =>
            of(errorActions.errorSet({payload: {errorMessage: 'Cann`t get access token', errorType: 'Server/Login User'}})))
        );
      })
    )
  );

  public saveAccessToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userSaveAccessToken),
      switchMap((accessToken: {type: string; payload: string}) => {
        const jwtUser: IJwtDecode = jwt_decode(accessToken.payload); // jwt secret code: json-server-auth-123456
        return this.dataService.getUser(jwtUser.sub).pipe(
          map((data: User) => {
            return userActions.userSignInSuccess({payload: data});
          }),
          catchError(() =>
            of(errorActions.errorSet({payload: {errorMessage: 'Cann`t get User info', errorType: 'Server/User info'}})))
        );
      }),
    )
  );

  public registerUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userRegistration),
      switchMap((action: {type: string; payload: User}) => {
        return this.dataService.registerUser(action.payload).pipe(
          map((accessToken: IAccessToken) => {
            return userActions.userSaveAccessToken({ payload: accessToken.accessToken });
          }),
          catchError(() =>
            of(errorActions.errorSet({payload: {errorMessage: 'Cann`t get access token', errorType: 'Server/Register user'}})))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {}
}
