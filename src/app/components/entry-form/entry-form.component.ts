import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {User} from '../../common/entities';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  public isLogin: boolean;
  public isHidePassword: boolean;
  public formGroup: FormGroup;
  public formControlEmail: AbstractControl | null;
  public formControlPassword: AbstractControl | null;
  public formControlConfirmPassword: AbstractControl | null;
  public formControlUserName: AbstractControl | null;

  constructor(
    private dialogRef: MatDialogRef<EntryFormComponent>,
    private store: Store<fromStore.IState>,
  ) { }

  public ngOnInit(): void {
    this.isLogin = true;
    this.isHidePassword = true;

    this.formGroup = this.createFromGroup();
  }

  public changeForms(): void {
    this.isLogin = !this.isLogin;
    this.isHidePassword = true;

    if (this.isLogin) {
      this.formControlConfirmPassword.disable();
      this.formControlUserName.disable();
    } else {
      this.formControlConfirmPassword.enable();
      this.formControlUserName.enable();
    }

    this.updateStateFormControls('resetErrors');
  }

  public submitForm(): void {
    this.updateStateFormControls('updateValidity');
    if (this.formGroup.valid) {
      let user: User = new User();
      const { email, password, userName } = this.formGroup.value;
      if (this.isLogin) {
        user = { ...user, email, password };
        this.store.dispatch(fromStore.userSignIn({ payload: user }));
        console.log('login:::');
      } else {
        user = { ...user, email, password, userName };
        this.store.dispatch(fromStore.userRegistration({ payload: user }));
        console.log('register:::');
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

    this.formControlEmail = fg.get('email');
    this.formControlPassword = fg.get('password');
    this.formControlConfirmPassword = fg.get('confirmPassword');
    this.formControlUserName = fg.get('userName');

    return fg;
  }

  private checkPassword(control: AbstractControl): {[key: string]: boolean} | null {
    if (this.isLogin || control.value === '' || control.value === null) {
      return null;
    }

    if (this.formControlConfirmPassword.value !== this.formControlPassword.value) {

      if (control === this.formControlPassword) {
        this.formControlConfirmPassword.setErrors({ notSame: true});
        return;
      } else if (control === this.formControlConfirmPassword) {
        return { notSame: true};
      }
    }
    this.formControlConfirmPassword.setErrors(null);
    return null;
  }

  private updateStateFormControls(method: string): void {
    Object.keys(this.formGroup.controls).forEach(
      (controlName: string): void => {
        const control = this.formGroup.controls[controlName];
        if (control.enabled) {

          switch (method) {
            case 'resetErrors':
              control.markAsUntouched();
              control.setErrors(null);
              break;
            case 'updateValidity':
              control.updateValueAndValidity();
              break;
            default:
              break;
          }
        }
      }
    );
  }
}
