export const webRoutes = {
    home: "",
    profile: "profile",
    advisor: "advisor",
    watchlist: "watchlist",
    investment: "investement",
    opportunities: "opportunities",
    auth: "auth",
    login: "login",
    registration: "register",
    accountType: "account-type",
    signup: "signup",
    otp: "otp",
    forgetPassword: "forget-password",
    changePassword: "change-password",
    success: "success",
}

export const apiRoutes = {
    login: "Account/login",
    register: "Account/register",
    validateEmail: "Account/SendOtpValidateEmail",
    validateOtp: "Account/ValidateOtpEmail",
    savePersonalInfo: "Investor/SavePersonalInformation",
    saveSpousePersonalInfo: "Investor/SaveSpouseInformation",
    saveEmploymentInfo: "Investor/SaveEmploymentInformation",
    saveSpouseEmploymentInfo: "Investor/SaveSpouseEmploymentInformation",
    saveFinancialInfo: "Investor/SaveFinancialInformation",
    saveInvestmentInfo: "Investor/SaveInvestmentInformation",
    saveDisclosure: "Investor/SaveDisclosure",
    saveAdvisor: "Investor/SaveAdvisor",
    saveBusinessInfo: "Investor/SaveBusinessInformation",
    saveBusinessDisclosures: "Investor/SaveBusinessDisclosures",
    saveCorporateFinancialInformation: "Investor/SaveFinancialInformationCorporate",
    saveShareholders: "Investor/SaveShareholders",
    getProfile: "Investor/GetInvestorKyc",
    getAdvisors: "Advisor/GetAll",
}