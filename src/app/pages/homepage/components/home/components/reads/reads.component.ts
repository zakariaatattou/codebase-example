import {Component, OnInit} from '@angular/core';
import {StrapiService} from "../../../../../../services/strapi-service.";
import {NgForOf} from "@angular/common";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-reads',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './reads.component.html',
  styleUrl: './reads.component.scss'
})
export class ReadsComponent  implements OnInit {
  content: any;
  constructor(private strapiService: StrapiService) {
  }

  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page", "en", "populate[0]=blogs&populate[1]=blogs.blogs&populate[2]=blogs.blogs.thumbnail").subscribe(res => {
      this.content = res?.data;
    });
  }

  protected readonly environment = environment;
}
