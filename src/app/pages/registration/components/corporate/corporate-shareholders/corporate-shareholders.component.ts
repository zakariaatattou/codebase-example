import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-corporate-shareholders',
  standalone: true,
  imports: [InputMaskModule, TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './corporate-shareholders.component.html',
  styleUrl: './corporate-shareholders.component.scss'
})
export class CorporateShareholdersComponent {
  @Input() x: any;

  constructor(private _fb: FormBuilder) { }


  onAddShareholder() {
    const formArr = this.x.get('shareholders') as FormArray;
    formArr.push(this._fb.group({
      ownerShipPercentage: 0,
      firstName: null,
      lastName: null,
      sin: null,
      email: null,
      investorId: 0
    }))
  }
}
