import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {StrapiService} from "../../../../../../services/strapi-service.";
import {environment} from "../../../../../../../environments/environment";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements OnInit{
  content : any;
  constructor(private strapiService: StrapiService) {}
  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page","en","populate[0]=whyGrowwise&populate[1]=whyGrowwise.feature&populate[2]=whyGrowwise.feature.photo").subscribe(res=>{
      this.content = res?.data;
    });
  }

  protected readonly environment = environment;
}
