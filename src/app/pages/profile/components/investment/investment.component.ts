import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [TabViewModule, InputTextModule, IconFieldModule, InputIconModule, InputIconModule, CalendarModule, TableModule],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent {

}
