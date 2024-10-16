import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { StrapiService } from "../../../../../../services/strapi-service.";
import { NgForOf } from "@angular/common";
import { environment } from "../../../../../../../environments/environment";

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PartnersComponent implements OnInit {
  content: any;
  breakpoints = {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  }
  constructor(private strapiService: StrapiService) {
  }

  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page", "en", "populate[0]=partners&populate[1]=partners.imgs&populate[2]=partners.imgs.image").subscribe(res => {
      this.content = res?.data;
    });
  }

  protected readonly environment = environment;
}



