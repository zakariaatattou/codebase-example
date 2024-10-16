import {Component, OnInit} from '@angular/core';
import {StrapiService} from "../../../../services/strapi-service.";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  footerDate : any;
  constructor(
    private strapiService: StrapiService
  ) {
  }
  ngOnInit(): void {
    this.strapiService.getStrapiContent("footer","en").subscribe(res=>{
      this.footerDate = res?.data;
    });
  }

}
