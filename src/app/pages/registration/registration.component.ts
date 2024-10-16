import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Stepper, StepperModule } from 'primeng/stepper';
import { RegistrationService } from './services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from "../auth/components/branding/branding.component";
import { IndividualPersonalInformationComponent } from './components/individual/personal-information/individual-personal-information.component';
import { IndividualEmploymentInformationComponent } from './components/individual/employment-information/individual-employment-information.component';
import { IndividalFinancialInformationComponent } from './components/individual/financial-information/individual-financial-information.component';
import { IndividualDisclosureComponent } from './components/individual/disclosure/individual-disclosure.component';
import { IdVerificationComponent } from './components/shared/id-verification/id-verification.component';
import { AdvisorComponent } from './components/shared/advisor/advisor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountType } from './enumns/account-type.enum';
import { CorporateAuthorizedRepresentativeComponent } from './components/corporate/corporate-authorized-representative/corporate-authorized-representative.component';
import { CorporateBusinessInformationComponent } from './components/corporate/corporate-business-information/corporate-business-information.component';
import { CorporateBusinessDisclosuresComponent } from './components/corporate/corporate-business-disclosures/corporate-business-disclosures.component';
import { CorporateShareholdersComponent } from './components/corporate/corporate-shareholders/corporate-shareholders.component';
import { CorporateDirectorsInformationComponent } from './components/corporate/corporate-directors-information/corporate-directors-information.component';
import { CorporateInvestmentInformationComponent } from './components/corporate/corporate-investment-information/corporate-investment-information.component';
import { CorporateFinancialInformationComponent } from './components/corporate/corporate-financial-information/corporate-financial-information.component';
import { IndividualInvestmentInformationComponent } from './components/individual/investment-information/individual-investment-information.component';
import { CorporateDisclosureComponent } from './components/corporate/corporate-disclosure/corporate-disclosure.component';
import { Observable, Subscription, catchError, concatMap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { webRoutes } from '../../core/constants/routes';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    //Modules
    ButtonModule, StepperModule, CommonModule, ReactiveFormsModule,
    // Components
    BrandingComponent,
    // Individual
    IndividualInvestmentInformationComponent,
    IndividualEmploymentInformationComponent,
    IndividalFinancialInformationComponent,
    IndividualPersonalInformationComponent,
    IndividualDisclosureComponent,
    // Corporate
    CorporateInvestmentInformationComponent,
    CorporateFinancialInformationComponent,
    CorporateDisclosureComponent,
    CorporateBusinessInformationComponent,
    CorporateAuthorizedRepresentativeComponent,
    CorporateBusinessDisclosuresComponent,
    CorporateShareholdersComponent,
    CorporateDirectorsInformationComponent,
    // Share
    IdVerificationComponent, AdvisorComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit, OnDestroy {
  accountTypes = AccountType;
  activeStep: number = 0;
  form: FormGroup;
  @ViewChild("stepper") stepper: Stepper;
  type: string | null = this._route.snapshot.paramMap.get('type')
  steps = this._registrationService.getStepsByType(this.type);
  advisors: Observable<any> = this._registrationService.getAdvisors()
  $advisorsSub: Subscription;
  /**
  * Constructor
  */
  constructor(
    private _registrationService: RegistrationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _fb: FormBuilder) {
  }

  ngOnDestroy(): void {
    this.$advisorsSub?.unsubscribe()
  }

  ngOnInit(): void {
    this.initForm();
    this.getAdvisors();

  }

  getAdvisors() {
    this.$advisorsSub = this._registrationService.getAdvisors().subscribe(res => {
      this.advisors = res;
    })
  }


  initForm() {
    // initilize main form group
    this.form = this._fb.group({});
    // Add steps as form groups
    this.steps?.forEach((step, index) => {
      this.form.addControl(index.toString(), this._fb.group({}));
      // Add investor type control
      if (this.activeStep === 0) (this.form.controls[index] as FormGroup).addControl("investorType", this._fb.control(this.getInvestorType(this.type)));
      // Add step inputs as controls
      step?.formControls?.forEach((input: any) => {
        const control = input.control || this._fb.control({ value: input?.value, disabled: input.disabled }, input?.validators);
        (this.form.controls[index] as FormGroup).addControl(input.name, control)
      });
    });
  }

  validateStep() {
    // Handle invalid step
    if (this.form.controls[this.activeStep].invalid) {
      // Display error message
      this._messageService.add({ severity: 'error', summary: 'Error', detail: "Please make sure to fill all step fields", });
      console.log(this.form.value[this.activeStep])
      return
    } else {
      this.markStepAsCompleted(this.activeStep);
      this.onNext()
    }
  }

  markStepAsCompleted(i: number) {
    this.steps[i]['completed'] = true
  }

  onNext() {
    if (this.activeStep < this.steps.length - 1) this.stepper.activeStepChange.emit(this.activeStep + 1);
  }

  onPrev() {
    this.stepper.activeStepChange.emit(this.activeStep - 1);
  }


  register() {
    // Register indiviual
    if (this.type === this.accountTypes.Individual) this.registerIndividual();
    // Register joint
    if (this.type === this.accountTypes.Joint) this.registerJoint();
    // Register corporate
    if (this.type === this.accountTypes.Corporate) this.registerCorporate();
  }

  filterNullableValues(object: any) {
    return Object.fromEntries(
      Object.entries(object)
        .filter(([_, value]) => value !== null && value !== undefined)
    )
  }

  getInvestorType(type: string | null): number {
    if (type == 'individual') return 1;
    if (type == 'joint') return 2;
    if (type == 'corporate') return 3;
    return 0
  }

  registerJoint() {
    const personalInfoVal = {
      ...this.form.getRawValue()[0],
      citizenship: this.form.getRawValue()[0].citizenship.name,
      city: this.form.getRawValue()[0].city.name,
      province: this.form.getRawValue()[0].province.name,
      countryOfResidence: this.form.getRawValue()[0].countryOfResidence.name,
    };
    delete personalInfoVal.address;

    const spousePersonalInfoVal = {
      spouseFirstName: this.form.getRawValue()[1].firstName,
      spouseLastName: this.form.getRawValue()[1].lastName,
      spouseDateOfBirth: this.form.getRawValue()[1].dateOfBirth,
      spouseCitizenship: this.form.getRawValue()[1].citizenship.name,
      spouseIsCanadian: this.form.getRawValue()[1].isCanadian,
      spouseSocialInsuranceNo: this.form.getRawValue()[1].socialInsuranceNo,
      spouseStreet: this.form.getRawValue()[1].socialInsuranceNo,
      spouseCity: this.form.getRawValue()[1].city.name,
      spouseProvince: this.form.getRawValue()[1].province.name,
      spousePostalCode: this.form.getRawValue()[1].postalCode,
      spousePhoneNumber: this.form.getRawValue()[1].phoneNumber,
      spouseMaritalStatus: this.form.getRawValue()[1].maritalStatus,
      spouseEmail: this.form.getRawValue()[1].email,
    };

    const spouseEmploymentInfoVal = {
      "spouseEmploymentStatus": this.form.value[3].employmentStatus,
      "spouseEmploymentName": this.form.value[3]?.employmentName,
      "spouseEmploymentAddress": this.form.value[3]?.employmentAddresss,
      "spouseJobTitle": this.form.value[3]?.jobTitle,
      "spouseEmploymentAge": this.form.value[3]?.employmentAge,
      "spouseBusinessSector": this.form.value[3]?.businessSector
    }
    this._registrationService.savePersonalInfo(personalInfoVal).pipe(
      concatMap(response1 => {
        return this._registrationService.saveSpousePersonalInfo(spousePersonalInfoVal);
      }),
      concatMap(response1 => {
        return this._registrationService.saveEmploymentInformation(this.filterNullableValues(this.form.value[2]));
      }),
      concatMap(response1 => {
        return this._registrationService.saveSpouseEmploymentInformation(this.filterNullableValues(spouseEmploymentInfoVal));
      }),
      concatMap(response2 => {
        return this._registrationService.saveFinancialInformation(this.form.value[4]);
      }),
      concatMap(response3 => {
        return this._registrationService.saveInvestmentInformation(this.form.value[5]);
      }),
      concatMap(response4 => {
        return this._registrationService.saveDisclosure({ ...this.form.value[6] });
      }),
      concatMap(response5 => {
        return this._registrationService.saveAdvisor([this.form.value[8].advisorId]);
      }),
      catchError((err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message, });
        return throwError(err);
      })
    ).subscribe(res => {
      this._router.navigate(["/" + webRoutes.registration + "/" + webRoutes.success], { state: { classification: res.classification } })
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err, });
    })
  }

  registerIndividual() {
    const formVal = {
      ...this.form.getRawValue()[0],
      citizenship: this.form.getRawValue()[0].citizenship.name,
      countryOfResidence: this.form.getRawValue()[0].countryOfResidence.name,
      city: this.form.getRawValue()[0].city.name,
      province: this.form.getRawValue()[0].province.name,
    }
    delete formVal.address;
    this._registrationService.savePersonalInfo(formVal).pipe(
      concatMap(response1 => {
        return this._registrationService.saveEmploymentInformation(this.filterNullableValues(this.form.getRawValue()[1]));
      }),
      concatMap(response2 => {
        return this._registrationService.saveFinancialInformation(this.form.getRawValue()[2]);
      }),
      concatMap(response3 => {
        return this._registrationService.saveInvestmentInformation(this.form.getRawValue()[3]);
      }),
      concatMap(response4 => {
        return this._registrationService.saveDisclosure({ ...this.form.getRawValue()[4] });
      }),
      concatMap(response5 => {
        return this._registrationService.saveAdvisor([this.form.getRawValue()[6].advisorId]);
      }),
      catchError((err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message, });
        return throwError(err);
      })
    ).subscribe(res => {
      this._router.navigate(["/" + webRoutes.registration + "/" + webRoutes.success], { state: { classification: res.classification } })
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err, });
    })
  }

  registerCorporate() {
    const formVal = {
      ...this.form.getRawValue()[0],
      citizenship: this.form.value[0].citizenship.name,
      city: this.form.value[0].city.name,
      province: this.form.getRawValue()[0].province.name,
      countryOfResidence: this.form.getRawValue()[0].countryOfResidence.name,
    }
    delete formVal.address;

    this._registrationService.savePersonalInfo(formVal).pipe(
      concatMap(response1 => {
        return this._registrationService.saveBusinessInformation(this.filterNullableValues(this.form.value[1]));
      }),
      concatMap(response2 => {
        return this._registrationService.saveBusinessDisclosures(this.form.value[2]);
      }),
      concatMap(response2 => {
        return this._registrationService.saveCorporateFinancialInformation(this.form.value[3]);
      }),
      concatMap(response3 => {
        return this._registrationService.saveShareholders(this.form.value[4].shareholders);
      }),
      concatMap(response3 => {
        return this._registrationService.saveInvestmentInformation(this.form.value[5]);
      }),
      concatMap(response4 => {
        return this._registrationService.saveDisclosure({ ...this.form.value[6] });
      }),
      concatMap(response5 => {
        return this._registrationService.saveAdvisor([this.form.value[8].advisorId]);
      }),
      catchError((err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message, });
        return throwError(err);
      })
    ).subscribe(res => {
      this._router.navigate(["/" + webRoutes.registration + "/" + webRoutes.success], { state: { classification: res.classification } })
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: err, });
    })
  }

  onSaveAsDraft() {
    if (this.form.controls[this.activeStep].valid) {
      this.steps[this.activeStep].apiHandler(this.form.controls[this.activeStep].value).subscribe((res: any) => {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: "Draft was successfully saved", });
      }, (err: any) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message, });
      })
    } else {
      // Display error message
      this._messageService.add({ severity: 'error', summary: 'Error', detail: "Please make sure to fill all step fields", });
    }
  }
}
