import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { webRoutes } from '../../../../core/constants/routes';
import { InputOtpModule } from 'primeng/inputotp';
import { TranslateModule } from "@ngx-translate/core";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../core/services/user.service';
@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterLink, InputOtpModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  otp: FormControl = new FormControl(null, [Validators.required, Validators.minLength(4)])
  routes = webRoutes
  routeData: any;
  constructor(private _router: Router, private _authService: AuthService,
    private _messageService: MessageService,
    private _userService: UserService,

  ) {
    this.routeData = this._router.getCurrentNavigation()?.extras?.state?.data
  }



  verifyOTP() {
    this._authService.validateOTP(this.otp.value, this.routeData.token).subscribe(res => {
      this.register(this.routeData.user)
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
    })
  }

  register(user: any) {
    const data = user;
    delete data.passwordConfirmation;
    this._authService.register(data).subscribe(res => {
      this.login(res.result.email, data.password, res.result);
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err, });
    })
  }

  login(email: string, password: string, savedUser: any) {
    this._authService.login(email, password).subscribe(res => {
      this._router.navigateByUrl("/" + this.routes.auth + "/" + this.routes.success);
      this._userService.setToken(res.token);
      this._userService.setUser(savedUser);
    }, err => {

      this._messageService.add({ severity: 'error', summary: 'Error', detail: err, });
    })
  }
}
