import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/user.action';
import {switchMap} from 'rxjs/operators';
import {DataService} from '../../common/services/data.service';

@Injectable()
export class UserEffect {
  public loginUser$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userSignIn, userActions.userRegistration),
      switchMap(
        (action) => this.dataService.
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {}
}
