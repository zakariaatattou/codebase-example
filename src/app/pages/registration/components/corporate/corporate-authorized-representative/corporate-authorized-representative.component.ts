import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { PhoneInputComponent } from '../../../../../shared/components/phone-input/phone-input.component';

@Component({
  selector: 'app-corporate-authorized-representative',
  standalone: true,
  imports: [TranslateModule, CommonModule, DropdownModule, PhoneInputComponent],
  templateUrl: './corporate-authorized-representative.component.html',
  styleUrl: './corporate-authorized-representative.component.scss'
})
export class CorporateAuthorizedRepresentativeComponent {

}
