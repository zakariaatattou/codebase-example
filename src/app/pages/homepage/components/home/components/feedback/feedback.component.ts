import {AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit} from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import {StrapiService} from "../../../../../../services/strapi-service.";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class FeedbackComponent  implements OnInit {
  content: any;
  constructor(private strapiService: StrapiService) {
  }

  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page", "en", "populate[0]=customerFeedback&populate[1]=customerFeedback.customer_feed_backs").subscribe(res => {
      this.content = res?.data;
    });
  }
  breakpoints = {
    640: {
      initialSlide: 1,
      slidesPerView: 1,
    },
    768: {
      initialSlide: 1,
      slidesPerView: 1,
    },
    1024: {
      initialSlide: 2,
      slidesPerView: 3,
    },
  }
}



