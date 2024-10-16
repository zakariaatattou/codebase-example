import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {StrapiService} from "../../../../../../services/strapi-service.";

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements OnInit {
  content: any;
  constructor(private strapiService: StrapiService) {
  }

  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page", "en", "populate[0]=howItWorks").subscribe(res => {
      this.content = res?.data;
    });
  }
}
