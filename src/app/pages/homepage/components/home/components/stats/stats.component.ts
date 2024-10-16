import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { StrapiService } from "../../../../../../services/strapi-service.";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  @HostBinding('style.height') height: string;
  content: any;
  constructor(private strapiService: StrapiService) {
  }
  ngOnInit(): void {
    this.strapiService.getStrapiContent("home-page", "en", "populate[0]=GlobalScale&populate[1]=GlobalScale.statistics").subscribe(res => {
      this.content = res?.data;
    });

    this.adjustHeight(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.adjustHeight(width);
  }

  private adjustHeight(width: number): void {
    this.height = `${(width * 0.5) + 200}px`;  // For example, set height as 50% of the viewport width
  }

}
