import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginFormComponent} from '../components/login/login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rent-bike-front-end';

  constructor(private dialog: MatDialog) {}

  public openLoginModal() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      maxWidth: '420px',
    });
  }
}
