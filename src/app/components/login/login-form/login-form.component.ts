import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public isHidePassword: boolean;
  public loginFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
  ) { }

  ngOnInit() {
    this.isHidePassword = true;
    this.loginFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public login(formGroup: FormGroup): void {
    console.log(formGroup);

    if (formGroup.valid) {
      this.dialogRef.close();
    }
  }
}
