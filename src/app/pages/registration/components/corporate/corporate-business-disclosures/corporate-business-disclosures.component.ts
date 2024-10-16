import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LookupService } from '../../../../../core/services/lookup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corporate-business-disclosures',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './corporate-business-disclosures.component.html',
  styleUrl: './corporate-business-disclosures.component.scss'
})
export class CorporateBusinessDisclosuresComponent {
  @Input() x: any;
  $entityPurposesList = this.lookupService.getEntityPurposesList()

  constructor(public lookupService: LookupService) { }
}
