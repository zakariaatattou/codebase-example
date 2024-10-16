import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { webRoutes } from '../../../../core/constants/routes';
import { TranslateModule } from "@ngx-translate/core";
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';

const modes: any = {
  form: 'form',
  type: 'type',
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, FloatLabelModule, PasswordModule, RouterLink, TranslateModule, PhoneInputComponent, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  investorForm: FormGroup;
  routes = webRoutes
  mode: 'type' | 'form' = 'type';
  accountType: FormControl = new FormControl(null, Validators.required);
  constructor(private _router: Router,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onContinue() {
    this.initIvestorForm()
    this.mode = modes.form;
  }

  initIvestorForm() {
    this.investorForm = this._fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: [null, [Validators.required, Validators.maxLength(30), Validators.pattern("(?=.*[A-Z])(?=.*[\\W])(?=.*[0-9])(?=.*[a-z]).{8,128}")]],
      passwordConfirmation: [null, [Validators.required, Validators.maxLength(30), Validators.pattern("(?=.*[A-Z])(?=.*[\\W])(?=.*[0-9])(?=.*[a-z]).{8,128}")]],
      phoneNumber: [null, Validators.required],
      userType: [this.accountType?.value],
    })
  }


  onValidateEmail() {
    this._authService.validateEmail(this.investorForm.value.email).subscribe(res => {
      this._router.navigate(["/" + this.routes.auth + "/" + this.routes.otp], { state: { data: { user: this.investorForm.value, token: res.result } } });
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
    })
  }

}
