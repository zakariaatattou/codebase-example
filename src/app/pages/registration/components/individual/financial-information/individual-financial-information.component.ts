import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
@Component({
  selector: 'app-individual-financial-information',
  standalone: true,
  imports: [
    TranslateModule, TooltipModule, CalendarModule, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './individual-financial-information.component.html',
  styleUrl: './individual-financial-information.component.scss'
})
export class IndividalFinancialInformationComponent implements OnChanges, OnDestroy {
  total: FormControl = new FormControl(null);
  percentages: any = {};
  $percentageSub: Subscription;
  @Input() x: any;
  constructor(public lookupService: LookupService, private _fb: FormBuilder) { }


  ngOnDestroy(): void {
    this.$percentageSub?.unsubscribe()
  };


  ngOnChanges(changes: SimpleChanges): void {
    // Todo: unsubscribe 
    if (changes?.x?.currentValue) {
      this.x['controls'].bonds.valueChanges.subscribe((bonds: any) => {
        this.updateTotalAndPercentages();
      });

      this.x['controls'].publicStocks.valueChanges.subscribe((publicStocks: any) => {
        this.updateTotalAndPercentages();
      });

      this.x['controls'].cashGIC.valueChanges.subscribe((cashGIC: any) => {
        this.updateTotalAndPercentages();
      });

      this.x['controls'].alternative.valueChanges.subscribe((alternative: any) => {
        this.updateTotalAndPercentages();
      });
    }
  }

  updateTotalAndPercentages() {
    const bonds = Number(this.x['controls'].bonds.value);
    const publicStocks = Number(this.x['controls'].publicStocks.value);
    const cashGIC = Number(this.x['controls'].cashGIC.value);
    const alternative = Number(this.x['controls'].alternative.value);

    // Update total
    this.total.setValue(bonds + publicStocks + cashGIC + alternative);

    // Calculate percentages
    this.calculatePercentages(bonds, publicStocks, cashGIC, alternative);
  }

  calculatePercentages(bonds: number, publicStocks: number, cashGIC: number, alternative: number) {
    this.percentages['bonds'] = Math.round((bonds / this.total.value) * 100);
    this.percentages['publicStocks'] = Math.round((publicStocks / this.total.value) * 100);
    this.percentages['cashGIC'] = Math.round((cashGIC / this.total.value) * 100);
    this.percentages['alternative'] = Math.round((alternative / this.total.value) * 100);
  }


  onAddPrivateInvestment() {
    (this.x.controls['investorPrivateInvestments'] as FormArray).push(this._fb.group({
      amount: [null, Validators.required],
      date: [null, Validators.required],
    }))
  }

  onRemovePrivateInvestment(index: number) {
    (this.x.controls['investorPrivateInvestments'] as FormArray).removeAt(index)
  }

  onPrivateInvestmentChange(event: any) {
    if (event.target.value == 'on') this.clearPrivateInvestment();
  }

  clearPrivateInvestment() {
    (this.x.controls['investorPrivateInvestments'] as FormArray).clear()
  }


}
