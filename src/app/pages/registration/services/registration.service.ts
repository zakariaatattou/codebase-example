import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpHandlerService } from '../../../core/services/http-handler.service';
import { apiRoutes } from '../../../core/constants/routes';
import { UserService } from '../../../core/services/user.service';
import { Observable, map } from 'rxjs';
import { LookupService } from '../../../core/services/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  steps: any = {
    individual: [
      {
        title: "Personal Information",
        description: "Please tell us a little about yourself",
        formControls: [
          {
            name: "firstName",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.firstName
          },
          {
            name: "lastName",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.lastName
          },
          {
            name: "email",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.email,
            disabled: true
          },
          {
            name: "dateOfBirth",
            validators: [Validators.required],
            value: null
          },
          {
            name: "phoneNumber",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.phoneNumber,
            disabled: true
          },
          {
            name: "citizenship",
            validators: [Validators.required],
            value: null
          },
          {
            name: "city",
            validators: [Validators.required],
            value: null
          },
          {
            name: "countryOfResidence",
            validators: [Validators.required],
            value: null
          },
          {
            name: "street",
            validators: [Validators.required],
            value: null
          },
          {
            name: "address",
            validators: [Validators.required],
            value: null
          },
          {
            name: "province",
            validators: [Validators.required],
            value: null
          },
          {
            name: "postalCode",
            validators: [Validators.required],
          },
          {
            name: "socialInsuranceNo",
            value: " ",
          },
          {
            name: "maritalStatus",
            validators: [Validators.required],
          },
          {
            name: "isCanadian",
            validators: [Validators.required],
            value: null
          }
        ],
        apiHandler: (data: any) => {
          return this.savePersonalInfo(data)
        }
      },
      {
        title: "Employment Information",
        description: "Please tell us a little about your job information",
        formControls: [
          {
            name: "employmentStatus",
            validators: [Validators.required]
          },
          {
            name: "employmentName", validators: [], value: null
          },
          {
            name: "employmentAddress", validators: [], value: null
          },
          {
            name: "jobTitle", validators: [], value: null
          },
          {
            name: "employmentAge", validators: [],
          },
          {
            name: "businessSector", validators: [],
          },
        ]
      },
      {
        title: "Financial Information",
        description: "Please tell us a little about your financial informtion",
        formControls: [
          { name: "annualIndividualIncome", validators: [Validators.required] },
          { name: "annualHouseholdIncome", validators: [Validators.required] },
          { name: "totalNetAssets", validators: [Validators.required] },
          { name: "totalNetWorth", validators: [Validators.required] },
          { name: "cashGIC", validators: [Validators.required], value: 0 },
          { name: "bonds", validators: [Validators.required], value: 0 },
          { name: "publicStocks", validators: [Validators.required], value: 0 },
          { name: "alternative", validators: [Validators.required], value: 0 },
          { name: "havePrivateInvestment", validators: [Validators.required] },
          {
            name: "investorPrivateInvestments", validators: [],
            control:
              this._fb.array([this._fb.group({
                amount: [null, Validators.required],
                date: [null, Validators.required],
              })])
          },
          // this._fb.array([
          //   this._fb.group({
          //     privateInvestmentValue: [null, Validators.required],
          //     privateInvestmentDate: [null, Validators.required],
          //   })
          // ])
          // [
          //   {
          //     "privateInvestmentValue": 0,
          //     "privateInvestmentDate": "2024-10-04T10:13:22.519Z"
          //   }
          // ]
        ]
      },
      {
        title: "Investment Information",
        description: "Please tell us a little about your Investment information",
        formControls: [
          { name: "riskLevel", validators: [Validators.required] },
          { name: "timeInvestment", validators: [Validators.required] },
          { name: "overallInvestment", validators: [Validators.required] },
          { name: "investmentKnowledge", validators: [Validators.required] },
          {
            name: "investmentTypeExperiences",
            validators: [Validators.required],
          },
        ]
      },
      {
        title: "Disclosure",
        formControls: [
          { name: "haveVoteTradeCompany", validators: [Validators.required], },
          { name: "voteTradeCompanyDetails", validators: [], value: "" },
          { name: "isDirectorTradeCompany", validators: [Validators.required] },
          { name: "directorTradeCompanyDetails", validators: [], value: "" },
          { name: "isPEP", validators: [Validators.required] },
          { name: "pepSelect", validators: [] },
          { name: "isHIO", validators: [Validators.required] },
          { name: "familyRelation", validators: [Validators.required] },
        ]
      },
      {
        title: "ID Verification",
      },
      {
        title: "Choose your advisor",
        formControls: [
          { name: "advisorId", validators: [Validators.required] },
          { name: "kyc", validators: [Validators.required] },
          { name: "rdi", validators: [Validators.required] },
        ]
      },
    ],
    joint: [
      {
        title: "Personal Information",
        description: "Please tell us a little about yourself",
        formControls: [
          {
            name: "countryOfResidence",
            validators: [Validators.required],
            value: null
          },
          {
            name: "address",
            validators: [Validators.required],
            value: null
          },
          {
            name: "firstName",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.firstName
          },
          {
            name: "lastName",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.lastName
          },
          {
            name: "email",
            disabled: true,
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.email
          },
          {
            name: "dateOfBirth",
            validators: [Validators.required],
            value: null
          },
          {
            name: "phoneNumber",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.phoneNumber,
            disabled: true
          },
          {
            name: "citizenship",
            validators: [Validators.required],
            value: null
          },
          {
            name: "city",
            validators: [Validators.required],
            value: null
          },
          {
            name: "street",
            validators: [Validators.required],
            value: null
          },
          {
            name: "province",
            validators: [Validators.required],
            value: null
          },
          {
            name: "postalCode",
            validators: [Validators.required],
          },
          {
            name: "socialInsuranceNo",
            value: " "
          },
          {
            name: "maritalStatus",
            validators: [Validators.required],
          },
          {
            name: "isCanadian",
            validators: [Validators.required],
            value: null
          }
        ]
      },
      {
        title: "Spouse Information",
        description: "Please tell us a little about your spouse information",
        formControls: [
          {
            name: "countryOfResidence",
            validators: [Validators.required],
            value: null
          },
          {
            name: "address",
            validators: [Validators.required],
            value: null
          },
          {
            name: "firstName",
            validators: [Validators.required],
          },
          {
            name: "lastName",
            validators: [Validators.required],
          },
          {
            name: "email",
            validators: [Validators.required],
          },
          {
            name: "dateOfBirth",
            validators: [Validators.required],
            value: null
          },
          {
            name: "phoneNumber",
            validators: [Validators.required],
          },
          {
            name: "citizenship",
            validators: [Validators.required],
            value: null
          },
          {
            name: "city",
            validators: [Validators.required],
            value: null
          },
          {
            name: "street",
            validators: [Validators.required],
            value: null
          },
          {
            name: "province",
            validators: [Validators.required],
            value: null
          },
          {
            name: "postalCode",
            validators: [Validators.required],
          },
          {
            name: "socialInsuranceNo",
            value: " "
          },
          {
            name: "maritalStatus",
            validators: [Validators.required],
          },
          {
            name: "isCanadian",
            validators: [Validators.required],
            value: null
          }
        ]
      },
      {
        title: "Employment Information",
        description: "Please tell us a little about your job information",
        formControls: [
          {
            name: "employmentStatus",
            validators: [Validators.required]
          },
          {
            name: "employmentName", validators: [], value: null
          },
          {
            name: "employmentAddress", validators: [], value: null
          },
          {
            name: "jobTitle", validators: [], value: null
          },
          {
            name: "employmentAge", validators: [],
          },
          {
            name: "businessSector", validators: [],
          },
        ]
      },
      {
        title: "Spouse Employment Information",
        description: "Please tell us a little about your spouse job information",
        formControls: [
          {
            name: "employmentStatus",
            validators: [Validators.required]
          },
          {
            name: "employmentName", validators: [], value: null
          },
          {
            name: "employmentAddress", validators: [], value: null
          },
          {
            name: "jobTitle", validators: [], value: null
          },
          {
            name: "employmentAge", validators: [],
          },
          {
            name: "businessSector", validators: [],
          },
        ]
      },
      {
        title: "Financial Information",
        description: "Please tell us a little about your financial informtion",
        formControls: [
          { name: "annualIndividualIncome", validators: [Validators.required] },
          { name: "annualHouseholdIncome", validators: [Validators.required] },
          { name: "totalNetAssets", validators: [Validators.required] },
          { name: "totalNetWorth", validators: [Validators.required] },
          { name: "cashGIC", validators: [Validators.required], value: 0 },
          { name: "bonds", validators: [Validators.required], value: 0 },
          { name: "publicStocks", validators: [Validators.required], value: 0 },
          { name: "alternative", validators: [Validators.required], value: 0 },
          { name: "havePrivateInvestment", validators: [Validators.required] },
          {
            name: "investorPrivateInvestments", validators: [],
            control:
              this._fb.array([this._fb.group({
                amount: [null, Validators.required],
                date: [null, Validators.required],
              })])
          },
          // this._fb.array([
          //   this._fb.group({
          //     privateInvestmentValue: [null, Validators.required],
          //     privateInvestmentDate: [null, Validators.required],
          //   })
          // ])
          // [
          //   {
          //     "privateInvestmentValue": 0,
          //     "privateInvestmentDate": "2024-10-04T10:13:22.519Z"
          //   }
          // ]
        ]
      },
      {
        title: "Investment Information",
        description: "Please tell us a little about your Investment information",
        formControls: [
          { name: "riskLevel", validators: [Validators.required] },
          { name: "timeInvestment", validators: [Validators.required] },
          { name: "overallInvestment", validators: [Validators.required] },
          { name: "investmentKnowledge", validators: [Validators.required] },
          {
            name: "investmentTypeExperiences",
            validators: [Validators.required],
          },
        ]
      },
      {
        title: "Disclosure",
        formControls: [
          { name: "haveVoteTradeCompany", validators: [Validators.required], },
          { name: "voteTradeCompanyDetails", validators: [] },
          { name: "isDirectorTradeCompany", validators: [Validators.required] },
          { name: "directorTradeCompanyDetails", validators: [] },
          { name: "isPEP", validators: [Validators.required] },
          { name: "pepSelect", validators: [] },
          { name: "isHIO", validators: [Validators.required] },
          { name: "familyRelation", validators: [Validators.required] },
        ]
      },
      {
        title: "ID Verification",
      },
      {
        title: "Choose your advisor",
        formControls: [
          { name: "advisorId", validators: [Validators.required] },
          { name: "kyc", validators: [Validators.required] },
          { name: "rdi", validators: [Validators.required] },
        ]
      },
    ],
    corporate: [
      {
        title: "Authorized Representatives",
        description: "Please tell us a little about your company",
        formControls: [
          {
            name: "countryOfResidence",
            validators: [Validators.required],
            value: null
          },
          {
            name: "address",
            validators: [Validators.required],
            value: null
          },
          {
            name: "firstName",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.firstName
          },
          {
            name: "lastName",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.lastName
          },
          {
            name: "email",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.email,
            disabled: true
          },
          {
            name: "dateOfBirth",
            validators: [Validators.required],
            value: null
          },
          {
            name: "phoneNumber",
            validators: [Validators.required],
            value: this._userService.getCurrentUserData()?.phoneNumber,
            disabled: true

          },
          {
            name: "citizenship",
            validators: [Validators.required],
            value: null
          },
          {
            name: "city",
            validators: [Validators.required],
            value: null
          },
          {
            name: "street",
            validators: [Validators.required],
            value: null
          },
          {
            name: "province",
            validators: [Validators.required],
            value: null
          },
          {
            name: "postalCode",
            validators: [Validators.required],
          },
          {
            name: "socialInsuranceNo",
            value: " "
          },
          {
            name: "maritalStatus",
            validators: [Validators.required],
          },
          {
            name: "isCanadian",
            validators: [Validators.required],
            value: null
          }
        ]
      },
      {
        title: "Business Information",
        description: "Please tell us a little About your business information",
        formControls: [
          { name: "businessName" },
          { name: "businessAddress" },
          { name: "telephoneNo" },
          { name: "website" },
          { name: "typeEntity" },
          { name: "jurisdictionIncorporation" },
          { name: "dateIncorporation" },
          { name: "crabn" },
          { name: "businessSector" }
        ]
      },
      {
        title: "Business Disclosures",
        formControls: [
          { name: "isEntityReport" },
          { name: "entityReportDetails", value: "" },
          { name: "purposeEntity" },
          { name: "isIncomeTaxAct", value: true },
          { name: "taxActRegistrationNo", value: " " },
          { name: "doesSolicitCharitable" },
        ]
      },
      {
        title: "Financial Information",
        description: "Please tell us a little about your financial information",
        formControls: [
          { name: "netIncome" },
          { name: "netAssets" }
        ]
      },
      {
        title: "Shareholders",
        formControls: [
          {
            name: "shareholders", control: this._fb.array([
              this._fb.group({
                ownerShipPercentage: 0,
                firstName: null,
                lastName: null,
                sin: null,
                email: null,
                investorId: 0
              })
            ])
          }
        ]
      },
      // {
      //   title: "Directors Information",
      // },
      {
        title: "Investment Information",
        formControls: [
          { name: "riskLevel", validators: [Validators.required] },
          { name: "timeInvestment", validators: [Validators.required] },
          { name: "overallInvestment", validators: [Validators.required] },
          { name: "investmentKnowledge", validators: [Validators.required] },
          {
            name: "investmentTypeExperiences",
            validators: [Validators.required],
          },
        ]
      },
      {
        title: "Disclosure",
        formControls: [
          { name: "haveVoteTradeCompany", validators: [Validators.required], },
          { name: "voteTradeCompanyDetails", validators: [], value: "" },
          { name: "isDirectorTradeCompany", validators: [Validators.required] },
          { name: "directorTradeCompanyDetails", validators: [], value: "" },
          { name: "isPEP", validators: [Validators.required] },
          { name: "pepSelect", validators: [] },
          { name: "isHIO", validators: [Validators.required] },
          { name: "familyRelation", validators: [Validators.required] },
        ]
      },
      {
        title: "ID Verification",
      },
      {
        title: "Choose your advisor",
        formControls: [
          { name: "advisorId", validators: [Validators.required] },
          { name: "kyc", validators: [Validators.required] },
          { name: "rdi", validators: [Validators.required] },
        ]
      },
    ],
  }
  constructor(private _fb: FormBuilder, private _http: HttpHandlerService, private _userService: UserService, private _lookupService: LookupService) {
  }


  getStepsByType(type: string | null): any[] {
    return this.steps[type as string]
  }


  savePersonalInfo(data: any): Observable<any> {
    return this._http.post(apiRoutes.savePersonalInfo, data);
  }


  saveSpousePersonalInfo(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveSpousePersonalInfo, data);
  }

  saveEmploymentInformation(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveEmploymentInfo, data);
  }

  saveSpouseEmploymentInformation(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveSpouseEmploymentInfo, data);
  }

  saveFinancialInformation(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveFinancialInfo, data);
  }

  saveInvestmentInformation(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveInvestmentInfo, data);
  }

  saveDisclosure(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveDisclosure, data);
  }

  saveAdvisor(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveAdvisor, data);
  }

  saveBusinessInformation(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveBusinessInfo, data);
  }

  saveBusinessDisclosures(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveBusinessDisclosures, data);
  }

  saveCorporateFinancialInformation(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveCorporateFinancialInformation, data);
  }

  saveShareholders(data: any): Observable<any> {
    return this._http.post(apiRoutes.saveShareholders, data);
  }

  getAdvisors(): Observable<any> {
    return this._http.get(apiRoutes.getAdvisors).pipe(
      map(data => data.data.$values)
    )
  }

}
