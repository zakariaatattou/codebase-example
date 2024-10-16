import { Component } from '@angular/core';
import { OpportunityCardComponent } from "../../../../shared/components/opportunity-card/opportunity-card.component";

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [OpportunityCardComponent],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss'
})
export class WatchListComponent {

}
