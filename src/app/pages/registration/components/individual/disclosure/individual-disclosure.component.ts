import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { CheckboxModule } from 'primeng/checkbox';
import { LookupService } from '../../../../../core/services/lookup.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-individual-disclosure',
  standalone: true,
  imports: [
    TranslateModule, CheckboxModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './individual-disclosure.component.html',
  styleUrl: './individual-disclosure.component.scss'
})
export class IndividualDisclosureComponent {
  @Input() x: any;
  $PEPList: any[] = this.lookupService.getPEPList();
  $familyRelationList: any[] = this.lookupService.getFamilyRelationList();
  constructor(public lookupService: LookupService) {
  }

  onHaveVoteTradeCompanyChange() {
    if (this.x.get("haveVoteTradeCompany").value) {
      this.x['controls'].voteTradeCompanyDetails.setValidators([Validators.required])
      this.x['controls'].voteTradeCompanyDetails.updateValueAndValidity()
    } else {
      this.x['controls'].voteTradeCompanyDetails.clearValidators()
      this.x['controls'].voteTradeCompanyDetails.updateValueAndValidity()
    }
    this.x['controls'].voteTradeCompanyDetails.setValue("")
  }

  onIsDirectorTradeCompanyChange() {
    if (this.x.get("isDirectorTradeCompany").value) {
      this.x['controls'].directorTradeCompanyDetails.setValidators([Validators.required])
      this.x['controls'].directorTradeCompanyDetails.updateValueAndValidity()
    } else {
      this.x['controls'].directorTradeCompanyDetails.clearValidators()
      this.x['controls'].directorTradeCompanyDetails.updateValueAndValidity()
    }
    this.x['controls'].directorTradeCompanyDetails.setValue("")

  }

  onIsPEPChange() {
    if (this.x.get("isPEP").value) {
      this.x['controls'].pepSelect.setValidators([Validators.required])
      this.x['controls'].pepSelect.updateValueAndValidity()
    } else {
      this.x['controls'].pepSelect.clearValidators()
      this.x['controls'].pepSelect.updateValueAndValidity()
    }
    this.x['controls'].pepSelect.setValue(null)
  }
}
