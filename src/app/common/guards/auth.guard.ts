import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getLoginStatus, IState} from '../../store/reducers';
import * as StoreActions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  private isLogin: boolean;
  private loginSubscription: Subscription;
  constructor(
    private router: Router,
    private store: Store<IState>,
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginSubscription = this.store.pipe(select(getLoginStatus)).subscribe(
      (data: boolean) => this.isLogin = data
    );

    if (!this.isLogin) {
      this.store.dispatch(StoreActions.errorSet({payload: {errorType: 'Authorization', errorMessage: 'You aren\'t authorized'}}));
    }

    return this.isLogin;
  }

  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
