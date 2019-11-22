import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material';

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

  public login(formGroup: FormGroup): void {
    console.log(formGroup);

    if (formGroup.valid) {
      this.dialogRef.close();
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

  private checkPassword(): {[key: string]: boolean} | null {

    if (this.isLogin || !this.formGroup) {
      return null;
    }

    if (this.loginFormConfirmPassword.value !== this.loginFormPassword.value) {
      console.log(this.loginFormConfirmPassword.value, this.loginFormPassword.value);
      return { notSame: true};
    }

    return null;
  }
}
