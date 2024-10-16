import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country, City, State, } from 'country-state-city';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private _httpClient: HttpClient) { }


  getCountries() {
    let countries = Country.getAllCountries()
    const indexOfCanada = countries.findIndex(item => item.name === 'Canada');
    if (indexOfCanada > -1) {
      // Remove the item from its current position
      const [removedItem] = countries.splice(indexOfCanada, 1);

      // Add the item to the top of the array
      countries.unshift(removedItem);
    }
    return countries;
  }


  getAddressSuggestions(query: string) {
    return this._httpClient.get(`https://api.radar.io/v1/search/autocomplete?query=${query}&layers=fine`, { 'headers': { 'Authorization': environment.radarGeolocationApiKey } })
  }

  getCities(countryCode: string | undefined): any {
    return City.getCitiesOfCountry(countryCode as any);
  }

  getStates(countryCode: string | undefined): any {
    return State.getStatesOfCountry(countryCode as any);
  }

  getAnnualIndividualIncomeList() {
    return [
      { name: "Less than $75,000", id: 1 }, { name: "$75,000 - $200,000", id: 2 }, { name: "More than $200,000", id: 3 }
    ]
  }

  getAnnualHouseholdIncomeList() {
    return [
      { name: "Less than $125,000", id: 1 }, { name: "$125,000 to $300,000", id: 2 }, { name: "More than $300,000", id: 3 }
    ]
  }

  getFinancialAssetsIncomeList() {
    return [
      { name: "Less than $400,000", id: 1 }, { name: "$400,000- $1,000,000", id: 2 }, { name: "More than $1,000,000", id: 3 }
    ]
  }

  getNetWorthList() {
    return [
      { name: "Less than $1000,000", id: 1 }, { name: "$1,000,000-$5000,000", id: 2 }, { name: "More than $5,000,000", id: 3 }
    ]
  }

  getBusinessSectorList() {
    return [
      { name: "Healthcare", id: 1 }, { name: "IT", id: 2 }, { name: "Energy", id: 3 }, { name: "Finance", id: 4 }
    ]
  }

  getEntityTypesList() {
    return [
      { name: "Employee", id: 1 }, { name: "Department", id: 2 }, { name: "Client", id: 3 }, { name: "Supplier", id: 4 }
    ]
  }

  getEntityPurposesList() {
    return [
      { name: "For profit", id: 1 }, { name: "Not for profit", id: 2 }
    ]
  }

  getEmploymentStatusList() {
    return [
      { name: "Employee", id: 1 }, { name: "Self-employment", id: 2 }, { name: "Retired", id: 3 }, { name: "Unemployed", id: 4 }
    ]
  }

  getMartialStatusList() {
    return [
      "Married", "Single", "Divorced"
    ]
  }

  getRiskList() {
    return [
      { name: "Low", id: 1 }, { name: "Medium", id: 2 }, { name: "High", id: 3 }
    ]
  }

  getInvestmentObjectiveTimeList() {
    return [
      { name: "Less than 5 years", id: 1 }, { name: "5 to 10 years", id: 2 }, { name: "More than 10 years", id: 3 }
    ]
  }

  getInvestmentObjectiveList() {
    return [
      { name: "Income", id: 1 }, { name: "Growth", id: 2 }, { name: "Income and Growth", id: 3 }
    ]
  }

  getInvestmentKnowleadgeList() {
    return [
      { name: "Limited", id: 1 }, { name: "Good", id: 2 }, { name: "Sophisticated", id: 3 }
    ]
  }

  getInvestmentTypesList() {
    return [
      { name: "Savings/GIC/Money Market", id: 1 },
      { name: "Bonds/Fixed Income", id: 2 },
      { name: "Public Stocks/ETFs/ Mutual Funds", id: 3 },
      { name: "Private Investments (Mortgage funds, REITs, Hedge Funds,etc.)", id: 4 }
    ]
  }

  getPEPList() {
    return [
      { name: "Head of state or head of government, governor general or lieutenant governor", id: 1 },
      { name: "President of a crown corporation, state-owned company or a state-owned bank", id: 2 },
      { name: "Judge of a supreme court, provincial appellate court, Federal Court of Appeal, Supreme Court of Canada or other court of last resort", id: 3 },
      { name: "Member of the executive council of government or legislature; member of a legislature, House of Commons or Senate", id: 4 },
      { name: "Leader or president of a political party represented in a  officer with a rank of general or above", id: 5 },
      { name: "Holder of any prescribed office or position or mayor", id: 6 },
      { name: "Ambassador or attaché or counsellor of an ambassador", id: 7 },
      { name: "Head of a government agency", id: 8 },
      { name: "Deputy minister or equivalent rank", id: 9 }
    ]
  }

  getFamilyRelationList() {
    return [
      { name: "A spouse, common-law partner, child, mother, father, brother, sister (including half-brother/sister), or mother or father of a spouse or common-law partner of a PEP or HIO", id: 1 },
      { name: "A close associate of a PEP or HIO.", id: 2 },
      { name: "None", id: 3 }
    ]
  }

  getNetIncomesList() {
    return [
      { name: "Less than $400,000", id: 1 },
      { name: "$400,000 - $1,000,000", id: 2 },
      { name: " More than $1,000,000 ", id: 3 },
    ]
  }

  getNetAssetsList() {
    return [
      { name: "Less than $1,000,000 ", id: 1 },
      { name: "$1,000,000 - $5,000,000", id: 2 },
      { name: "More than $5,000,000 ", id: 3 },
    ]
  }


}
