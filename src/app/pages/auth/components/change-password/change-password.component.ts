import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { webRoutes } from '../../../../core/constants/routes';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink, InputTextModule, ReactiveFormsModule, FloatLabelModule, PasswordModule, CheckboxModule, TranslateModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  routes = webRoutes;
  form: FormGroup;
  constructor(private _router: Router, private _fb: FormBuilder) { }

  navigateToLogin() {
    this._router.navigateByUrl("/" + this.routes.auth + "/" + this.routes.login)
  }


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
    })
  }
}
