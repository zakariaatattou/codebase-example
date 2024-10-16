import {Component, OnInit} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import {StrapiService} from "../../../../../../services/strapi-service.";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, NgForOf,],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit{
  content : any;
  constructor(private strapiService: StrapiService) {}
  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page","en","populate[0]=faqs&populate[1]=faqs.faqs").subscribe(res=>{
      this.content = res?.data;
    });
  }

}
