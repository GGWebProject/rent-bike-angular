import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/user.action';
import * as errorActions from '../actions/error.action';
import {catchError, concatMap, map, switchMap, tap} from 'rxjs/operators';
import {DataService} from '../../common/services/data.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {User} from '../../common/entities';
import {IAccessToken} from '../../common/interfaces/iaccess-token';
import * as jwt_decode from 'jwt-decode';
import {IJwtDecode} from '../../common/interfaces';


const toPayload = <T>(action: { payload: T }) => action.payload;

@Injectable()
export class UserEffect {
  public loginUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userSignIn),
      concatMap((action: {type: string; payload: User}) => {
          return this.dataService.loginUser(action.payload).pipe(
            tap((accessToken: IAccessToken) => userActions.userSaveAccessToken({ payload: accessToken.accessToken })),
            map((accessToken: IAccessToken) => {
              const jwtUser: IJwtDecode = jwt_decode(accessToken.accessToken);
              console.log(jwtUser.sub);
              return userActions.userSignOut();
            }),
            catchError(() => of(errorActions.errorSet({payload: {errorMessage: '', errorType: ''}})))
          );
        }
      )
    )
  );

  public registerUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userRegistration),
      switchMap((action: {type: string; payload: User}) => {
          console.log(action.payload, action.type);
          return of(errorActions.errorRemove());
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {}
}
