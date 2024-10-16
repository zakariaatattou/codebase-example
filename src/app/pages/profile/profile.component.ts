import { Component } from '@angular/core';
import { HeaderComponent } from '../homepage/components/header/header.component';
import { FooterComponent } from '../homepage/components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { webRoutes } from '../../core/constants/routes';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  webRoutes = webRoutes;
}
