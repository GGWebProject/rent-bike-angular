import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material';
import {DataService} from '../../../common/services/data.service';
import {User} from '../../../common/entities';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public isLogin: boolean;
  public isHidePassword: boolean;
  public formGroup: FormGroup;

  public loginFormEmail: AbstractControl | null;
  public loginFormPassword: AbstractControl | null;
  public loginFormConfirmPassword: AbstractControl | null;
  public loginFormUserName: AbstractControl | null;

  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private dataService: DataService,
  ) { }

  public ngOnInit(): void {
    this.isLogin = true;
    this.isHidePassword = true;

    this.formGroup = this.createFromGroup();
  }

  public changeIsLogin(): void {
    this.isLogin = !this.isLogin;
    this.isHidePassword = true;

    this.formGroup = this.createFromGroup();
  }

  public submitForm(formGroup: FormGroup): void {
    console.log(formGroup);
    this.dataService.getUsers()
      .subscribe();

    if (formGroup.valid) {
      let user: User = new User();
      const { email, password, userName } = formGroup.value;
      if (this.isLogin) {
        user = { ...user, email, password };
        this.dataService.loginUser(user).subscribe(
          (data) => console.log('Login Access token:', data),
        );
      } else {
        user = { ...user, email, password, userName };
        this.dataService.registerUser(user).subscribe(
          (data) => console.log('Register Access token:', data),
        );
      }
    }
  }

  private createFromGroup(): FormGroup {
    const fg: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), this.checkPassword.bind(this)]),
      confirmPassword: new FormControl({value: null, disabled: this.isLogin},
        [Validators.required, Validators.minLength(8), this.checkPassword.bind(this)]),
      userName: new FormControl({value: null, disabled: this.isLogin}, [Validators.required])
    });

    this.loginFormEmail = fg.get('email');
    this.loginFormPassword = fg.get('password');
    this.loginFormConfirmPassword = fg.get('confirmPassword');
    this.loginFormUserName = fg.get('userName');

    return fg;
  }

  private checkPassword(control: AbstractControl): {[key: string]: boolean} | null {

    if (this.isLogin) {
      return null;
    }

    if (this.loginFormConfirmPassword.value !== this.loginFormPassword.value) {

      if (control === this.loginFormPassword) {
        this.loginFormConfirmPassword.setErrors({ notSame: true});
        return;
      } else if (control === this.loginFormConfirmPassword) {
        return { notSame: true};
      }
    }
    this.loginFormConfirmPassword.setErrors(null);
    return null;
  }
}
