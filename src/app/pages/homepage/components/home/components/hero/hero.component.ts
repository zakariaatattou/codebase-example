import {Component, OnInit} from '@angular/core';
import {StrapiService} from "../../../../../../services/strapi-service.";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent  implements OnInit{
  content : any;
  constructor(private strapiService: StrapiService) {}
  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page","en","populate[0]=heroSection&populate[1]=heroSection.image&populate[2]=heroSection.imageMobile").subscribe(res=>{
      this.content = res?.data;
    });
  }

  protected readonly environment = environment;
}
