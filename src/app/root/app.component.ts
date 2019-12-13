import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EntryFormComponent} from '../components/entry-form/entry-form.component';
import {Observable, Subscription} from 'rxjs';
import {getLoginStatus, IState} from '../store/reducers';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rent-bike-front-end';
  public isLogin$: Observable<boolean>;
  private loginSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<IState>
  ) {}

  public ngOnInit(): void {
    this.isLogin$ = this.store.pipe(select(getLoginStatus));
    this.loginSub = this.isLogin$.subscribe(
      (isLogin: boolean) => {
        if (isLogin) {
          this.dialog.closeAll();
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  public openSignInModal() {
    const dialogRef = this.dialog.open(EntryFormComponent, {
      maxWidth: '420px',
    });
  }

  public signOut(): void {
    this.store.dispatch(fromStore.userSignOut());
  }
}
