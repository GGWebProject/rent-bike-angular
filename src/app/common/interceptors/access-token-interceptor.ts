import {Injectable, OnDestroy} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getAccessToken, IState} from '../../store/reducers';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor, OnDestroy {
  private accessToken: string;
  private accessTokenSubscription: Subscription;

  constructor(
    private store: Store<IState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessTokenSubscription = this.store.pipe(select(getAccessToken)).subscribe(
      (data: string) => this.accessToken = data
    );

    if (this.accessToken) {
      const requestWithToken = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`)
      });
      return next.handle(requestWithToken);
    }

    return next.handle(request);
  }

  public ngOnDestroy(): void {
    this.accessTokenSubscription.unsubscribe();
  }
}
