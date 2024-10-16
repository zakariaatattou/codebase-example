import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { webRoutes } from '../../../../core/constants/routes';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { Type } from '../../../../core/enums/type.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    TranslateModule, RouterLink, CommonModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  webRoutes = webRoutes;
  user = this._userService.getCurrentUserData();
  userTypes = Type;
  constructor(private _userService: UserService) {
    console.log(this.userTypes)
  }
}
