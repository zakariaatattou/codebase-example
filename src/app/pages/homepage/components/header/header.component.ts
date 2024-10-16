import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { webRoutes } from '../../../../core/constants/routes';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/base';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  routes = webRoutes;
  collapsed: boolean = false;
  investingMenuCollapsed: boolean = false;
  investingItems: MenuItem[] = [
    {
      label: "All Offerings",
      description: "The latest industry news, updates and info.",
      routerLink: ""
    },
    {
      label: "Crowdfunds",
      description: "Learn how our customers are making big Investments in crowdfunds.",
      routerLink: ""
    },
    {
      label: "OM",
      description: "Learn how our customers are making big Investments in om.",
      routerLink: ""
    },
    {
      label: "AI",
      description: "Learn how our customers are making big Investments in AI.",
      routerLink: ""
    },
  ];
  profileItems: MenuItem[] = [
    { label: "Profile", icon: "pi-user", routerLink: "/" + webRoutes.profile + "/" + "information" },
    { label: "Logout", icon: "pi-sign-out", command: () => this.onLogout() }
  ]
  langItems: MenuItem[] = [
    { label: "EN", },
    { label: "FR", },
  ];

  user: any = { ...this.userService?.getCurrentUserData() };
  constructor(public userService: UserService) { }


  onLogout() {
    this.userService.clear();
    window.location.reload();
  }
}
