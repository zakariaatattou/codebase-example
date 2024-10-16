import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-individual-employment-information',
  standalone: true,
  imports: [DropdownModule, TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './individual-employment-information.component.html',
  styleUrl: './individual-employment-information.component.scss'
})
export class IndividualEmploymentInformationComponent implements OnChanges, OnDestroy {
  @Input() x: any;
  $changeSub: Subscription;
  constructor(public lookupService: LookupService) { }


  ngOnDestroy(): void {
    this.$changeSub?.unsubscribe()
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.x?.currentValue) {
      this.$changeSub = this.x['controls']?.employmentStatus.valueChanges.subscribe((val: any) => {
        val == 1 || val == 2 ? this.setValidators() : this.removeValidators()
      })
    }
  }

  removeValidators() {
    this.x['controls'].employmentName.setValidators([]);
    this.x['controls'].employmentName.updateValueAndValidity();
    this.x['controls'].employmentAddress.setValidators([]);
    this.x['controls'].employmentAddress.updateValueAndValidity();
    this.x['controls'].jobTitle.setValidators([]);
    this.x['controls'].jobTitle.updateValueAndValidity();
    this.x['controls'].employmentAge.setValidators([]);
    this.x['controls'].employmentAge.updateValueAndValidity();
    this.x['controls'].businessSector.setValidators([]);
    this.x['controls'].businessSector.updateValueAndValidity();
  }

  setValidators() {
    this.x['controls'].employmentName.setValidators([Validators.required]);
    this.x['controls'].employmentName.updateValueAndValidity();
    this.x['controls'].employmentAddress.setValidators([Validators.required]);
    this.x['controls'].employmentAddress.updateValueAndValidity();
    this.x['controls'].jobTitle.setValidators([Validators.required]);
    this.x['controls'].jobTitle.updateValueAndValidity();
    this.x['controls'].employmentAge.setValidators([Validators.required]);
    this.x['controls'].employmentAge.updateValueAndValidity();
    this.x['controls'].businessSector.setValidators([Validators.required]);
    this.x['controls'].businessSector.updateValueAndValidity();

  }


}
