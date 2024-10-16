import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { webRoutes } from '../../../../core/constants/routes';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-type',
  standalone: true,
  imports: [
    TranslateModule, RouterLink, ReactiveFormsModule
  ],
  templateUrl: './account-type.component.html',
  styleUrl: './account-type.component.scss'
})
export class AccountTypeComponent {
  routes = webRoutes;
  accountType: FormControl = new FormControl(null, Validators.required);


  constructor(private _router: Router) { }


  onNext() {
    if (this.accountType.valid) {
      this._router.navigateByUrl("/" + this.routes.registration + "/" + this.accountType.value)
    }
  }
}
