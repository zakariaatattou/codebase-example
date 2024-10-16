import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LookupService } from '../../../../../core/services/lookup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corporate-financial-information',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule],

  templateUrl: './corporate-financial-information.component.html',
  styleUrl: './corporate-financial-information.component.scss'
})
export class CorporateFinancialInformationComponent {
  @Input() x: any;

  $netIncomesList = this.lookupService.getNetIncomesList();
  $netAssetsList = this.lookupService.getNetAssetsList();
  constructor(public lookupService: LookupService) { }
}
