import {Component, OnInit} from '@angular/core';
import { OpportunityCardComponent } from '../../../../../../shared/components/opportunity-card/opportunity-card.component';
import { TranslateModule } from "@ngx-translate/core";
import { webRoutes } from '../../../../../../core/constants/routes';
import { RouterLink } from '@angular/router';
import {StrapiService} from "../../../../../../services/strapi-service.";

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [OpportunityCardComponent, TranslateModule, RouterLink],
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.scss'
})
export class OpportunitiesComponent implements OnInit {
  content: any;
  constructor(private strapiService: StrapiService) {
  }
  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page", "en", "populate[0]=opportunities").subscribe(res => {
      this.content = res?.data;
    });
  }
  routes = webRoutes;
}
