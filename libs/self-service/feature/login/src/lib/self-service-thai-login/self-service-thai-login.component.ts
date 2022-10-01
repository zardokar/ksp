import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordSearchPersonComponent } from '@ksp/shared/dialog';
import { SelfServiceLoginService } from './self-service-login.service';
import { setCookie } from '@ksp/shared/utility';
import { MyInfoService } from '@ksp/shared/service';
import { switchMap } from 'rxjs';
import localForage from 'localforage';
@Component({
  templateUrl: './self-service-thai-login.component.html',
  styleUrls: ['./self-service-thai-login.component.css'],
})
export class SelfServiceThaiLoginComponent {
  eyeIconClicked = false;

  form = this.fb.group({
    username: [],
    password: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: SelfServiceLoginService,
    public dialog: MatDialog,
    private myInfoService: MyInfoService
  ) {}

  register() {
    this.router.navigate(['/landing']);
  }

  login() {
    this.loginService.validateLogin(this.form.value).subscribe((res) => {
      if (res && res.id && res.usertoken) {
        localForage.setItem('my-info', res);
        setCookie('userToken', res.usertoken, 1);
        setCookie('userId', res.id, 1);
        this.router.navigate(['/home']);
      } else {
        return;
      }
    });
  }

  forgot() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordSearchPersonComponent, {
      width: '350px',
    });
    dialogRef.componentInstance.confirmed
      .pipe(switchMap((res) => this.myInfoService.resetPassword(res)))
      .subscribe((res) => console.log(res));
  }
}
