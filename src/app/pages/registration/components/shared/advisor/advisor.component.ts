import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateModule } from "@ngx-translate/core";
import { RegistrationService } from '../../../services/registration.service';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [CommonModule, CheckboxModule, TranslateModule, DialogModule, ReactiveFormsModule],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss'
})
export class AdvisorComponent implements OnChanges {
  @Input() x: any;
  @Input() advisors: any;
  selectedAdvisor: any;
  mode: 'listing' | 'single';
  visible: boolean;
  constructor(private _registrationService: RegistrationService,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.x?.currentValue) {
      this.mode = this.x.controls['advisorId'].value ? 'single' : 'listing';
      this.selectedAdvisor = this.advisors.find((item: any) => item.id == this.x.controls['advisorId'].value)
    }
  }


  onSelectAdvisor(advisor: any) {
    this.selectedAdvisor = advisor;
    this.x.controls['advisorId'].setValue(advisor.id);
    this.mode = "single";
  }

  onUnselectAdvisor() {
    this.mode = "listing";
    this.x.controls['advisorId'].setValue(null);
    this.x.controls['kyc'].setValue(null);
    this.x.controls['rdi'].setValue(null);
  }


  showDialog() {
    this.visible = true;
  }


  onRDIComplianceChange() {
    this.showDialog()
  }

  onAgreeToRDI() {
    this.visible = false;
    this.x.controls['rdi'].setValue(true);
    console.log(this.x['controls'])
  }
}
