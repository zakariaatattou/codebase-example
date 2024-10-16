import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-opportunity-card',
  standalone: true,
  imports: [RouterLink, ProgressBarModule, CommonModule],
  templateUrl: './opportunity-card.component.html',
  styleUrl: './opportunity-card.component.scss'
})
export class OpportunityCardComponent {
  @Input() variation: 'variation-1' | 'variation-2' = 'variation-1';
}
