import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getLoginStatus, IState} from '../../store/reducers';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<IState>,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.store.pipe(select(getLoginStatus))
    return this.store.pipe(select(getLoginStatus)).pipe(tap(data => console.log(data)));
    // return this.router.navigate(['/login']);
  }
}
