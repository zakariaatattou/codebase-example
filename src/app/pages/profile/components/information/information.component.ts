import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { UserService } from '../../../../core/services/user.service';
@Component({
  selector: 'app-information',
  standalone: true,
  imports: [TabViewModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  user = this._userService.getCurrentUserData();
  constructor(private _userService: UserService) { }
}
