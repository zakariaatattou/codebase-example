import { Component, OnInit } from '@angular/core';
import { webRoutes } from '../../../../core/constants/routes';
import { RouterLink } from '@angular/router';
import { StrapiService } from "../../../../services/strapi-service.";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss'
})
export class BrandingComponent implements OnInit {
  routes = webRoutes;
  brandingContentData: any;
  version = environment.version;
  constructor(private strapiService: StrapiService) { }
  ngOnInit(): void {
    this.strapiService.getStrapiContent("public-layout", "en").subscribe(res => {
      this.brandingContentData = res?.data;
    });
  }
}
