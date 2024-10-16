


import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { FeaturesComponent } from './components/features/features.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HeroComponent } from './components/hero/hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ReadsComponent } from './components/reads/reads.component';
import { StatsComponent } from './components/stats/stats.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FaqComponent, HeroComponent, FeaturesComponent, OpportunitiesComponent, PartnersComponent, HowItWorksComponent, StatsComponent, FeedbackComponent, AboutComponent, ReadsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
