import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { webRoutes } from '../../../../core/constants/routes';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterLink, InputTextModule, ReactiveFormsModule, FloatLabelModule, TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  routes = webRoutes
  email: FormControl = new FormControl(null, Validators.required)
  constructor(private _router: Router) { }

  navigateToChangePassword() {
    this._router.navigateByUrl("/" + this.routes.auth + "/" + this.routes.changePassword)
  }
}
