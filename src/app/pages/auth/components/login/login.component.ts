import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { webRoutes } from '../../../../core/constants/routes';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../core/services/user.service';
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, PhoneInputComponent, FloatLabelModule, PasswordModule, RouterLink, TranslateModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  routes = webRoutes;

  form: FormGroup;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm()
  }


  initForm() {
    this.form = this._fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
  }


  onLogin() {
    this._authService.login(this.form.value.email, this.form.value.password).subscribe(res => {
      this._userService.setToken(res.token);
      this._userService.setUser(res.userData);
      this._router.navigateByUrl("/" + this.routes.home)
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err.errors[0] });
    })
  }
}
