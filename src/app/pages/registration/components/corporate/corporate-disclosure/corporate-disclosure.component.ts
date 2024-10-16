import { Component, Input } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CheckboxModule } from 'primeng/checkbox';
import { LookupService } from '../../../../../core/services/lookup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corporate-disclosure',
  standalone: true,
  imports: [
    TranslateModule, CheckboxModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './corporate-disclosure.component.html',
  styleUrl: './corporate-disclosure.component.scss'
})
export class CorporateDisclosureComponent {
  @Input() x: any;


  constructor(private _lookupService: LookupService) { }
}
