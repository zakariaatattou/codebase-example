import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OpportunityCardComponent } from '../../../../shared/components/opportunity-card/opportunity-card.component';
@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, IconFieldModule, InputIconModule, InputTextModule, OpportunityCardComponent],
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.scss'
})
export class OpportunitiesComponent {

}
