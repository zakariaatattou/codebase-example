import { Component, Input } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from "@ngx-translate/core";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-individual-investment-information',
  standalone: true,
  imports: [TooltipModule, CheckboxModule, TranslateModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './individual-investment-information.component.html',
  styleUrl: './individual-investment-information.component.scss'
})
export class IndividualInvestmentInformationComponent {
  @Input() x: any;
  $getInvestmentTypesList: any[] = this.lookupService.getInvestmentTypesList();
  constructor(public lookupService: LookupService) {
  }
}
