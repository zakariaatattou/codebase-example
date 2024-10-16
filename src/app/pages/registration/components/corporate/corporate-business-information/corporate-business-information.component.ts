import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PhoneInputComponent } from '../../../../../shared/components/phone-input/phone-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LookupService } from '../../../../../core/services/lookup.service';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-corporate-business-information',
  standalone: true,
  imports: [InputMaskModule, TranslateModule, DropdownModule, CalendarModule, PhoneInputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './corporate-business-information.component.html',
  styleUrl: './corporate-business-information.component.scss'
})
export class CorporateBusinessInformationComponent {
  @Input() x: any;
  $sectorsList = this.lookupService.getBusinessSectorList();
  $entityTypesList = this.lookupService.getEntityTypesList();

  constructor(public lookupService: LookupService) { }
}
