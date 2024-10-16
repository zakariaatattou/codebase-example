import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { webRoutes } from '../../../../core/constants/routes';
import { BrandingComponent } from '../../../auth/components/branding/branding.component';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [TranslateModule, RouterLink, BrandingComponent],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  webRoutes = webRoutes;
  classification: string | null;
  constructor(private _router: Router) {
    this.classification = this._router.getCurrentNavigation()?.extras?.state?.classification
  }
}
