import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
// @ts-ignore
import intlTelInput from 'intl-tel-input';

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PhoneInputComponent),
  multi: true,
};

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})
export class PhoneInputComponent implements OnInit {
  @ViewChild('textInput') textInput: ElementRef;
  iti: any;
  @Input() readonly: boolean;
  ngOnInit() {
    const input = document.querySelector("#phone");
    this.iti = intlTelInput(input as any, {
      separateDialCode: true,
      initialCountry: "ca",
      preferredCountries: ["us", "gb", "ca"],
    });
  }

  public value = new FormControl();

  constructor(private _renderer: Renderer2) { }


  ngAfterViewInit() {
    this.value.valueChanges.subscribe((x) => {
      this.onChangeFn("+" + this.iti.getSelectedCountryData().dialCode + x);
    });
  }

  writeValue(value: number): void {
    this.value.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onChangeFn = (_: any) => { };

  setDisabledState(isDisabled: boolean) {
    setTimeout(() => {
      this._renderer.setProperty(this.textInput.nativeElement, 'disabled', isDisabled);
    }, 1);
  }

}
