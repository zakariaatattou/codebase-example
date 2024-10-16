import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {StrapiService} from "../../../../../../services/strapi-service.";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{
  protected readonly environment = environment;
  content : any;
  constructor(private strapiService: StrapiService) {}
  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page","en","populate[0]=Insights&populate[1]=Insights.photo").subscribe(res=>{
      this.content = res?.data;
    });
  }
}
