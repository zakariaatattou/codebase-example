import { Component, Input, OnDestroy } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { PhoneInputComponent } from '../../../../../shared/components/phone-input/phone-input.component';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-individual-personal-information',
  standalone: true,
  imports: [AutoCompleteModule, InputMaskModule, InputSwitchModule, CheckboxModule, DropdownModule, CalendarModule, ReactiveFormsModule, CommonModule, TranslateModule, PhoneInputComponent],
  templateUrl: './individual-personal-information.component.html',
  styleUrl: './individual-personal-information.component.scss'
})
export class IndividualPersonalInformationComponent implements OnDestroy {
  @Input() x: any;
  $countries = this.lookupService.getCountries();
  $cities: any[];
  $states: any[];
  addressSuggestions: any;
  addressSuggestionsSub: Subscription;
  constructor(public lookupService: LookupService) {
  }

  onCountryChange(event: any) {
    this.$cities = this.lookupService.getCities(this.x['controls'].citizenship.value.isoCode);
  }

  loadCities(isoCode: string | undefined) {
    this.$cities = this.lookupService.getCities(isoCode);
  }

  loadStates(isoCode: string | undefined) {
    this.$states = this.lookupService.getStates(isoCode);
  }

  onSearchAddresses(event: AutoCompleteCompleteEvent) {
    this.addressSuggestionsSub = this.lookupService.getAddressSuggestions(event.query).subscribe((res: any) => {
      this.addressSuggestions = res.addresses
    }, err => {

    })
  }

  onAddressSelect(event: AutoCompleteSelectEvent) {

    // Store value
    const optionVal = event.value;
    // Format value
    const formattedVal = `${optionVal.number} ${optionVal.street} ${optionVal.city} ${optionVal.stateCode} ${optionVal.postalCode} ${optionVal.country}`.split(' ').filter(item => item !== "undefined").join(" ");
    // Store country
    const country = this.$countries.find(item => item.name === optionVal.country);
    // Load cities based on selected country
    this.loadCities(country?.isoCode);
    // Store city
    const city = this.$cities.find(item => item.name == optionVal.city);
    // Load states
    this.loadStates(country?.isoCode);
    // Store province/state
    const province = this.$states.find(item => item.name == optionVal.state)
    // Fill controls 
    this.x['controls'].city.setValue(city);
    this.x['controls'].countryOfResidence.setValue(country);
    this.x['controls'].street.setValue(optionVal.street);
    this.x['controls'].postalCode.setValue(optionVal.postalCode);
    this.x['controls'].province.setValue(province);
    this.x['controls'].address.setValue(formattedVal);
  }

  ngOnDestroy(): void {
    this.addressSuggestionsSub?.unsubscribe()
  }

}
