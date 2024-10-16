import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-corporate-investment-information',
  standalone: true,
  imports: [TranslateModule, CheckboxModule],
  templateUrl: './corporate-investment-information.component.html',
  styleUrl: './corporate-investment-information.component.scss'
})
export class CorporateInvestmentInformationComponent {

}
