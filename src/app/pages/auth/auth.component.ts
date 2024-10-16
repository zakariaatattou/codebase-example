import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandingComponent } from "./components/branding/branding.component";
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, BrandingComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor() {

  };



}
