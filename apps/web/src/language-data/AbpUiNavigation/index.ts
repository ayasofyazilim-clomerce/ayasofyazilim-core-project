import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface AbpUiNavigationResource {
  HomePage: string;
  Dashboard: string;
  Crm: string;
  Management: string;
  Profile: string;
  UserSettings: string;
  Companies: string;
  Template: string;
  Details: string;
  Contracts: string;
  RebateTables: string;
  LogIn: string;
  RefundTables: string;
  RefundFees: string;
  Add: string;
  TenantSettings: string;
  VATSettings: string;
  Settings: string;
  IdentityManagement: string;
  LanguageManagement: string;
  SaasManagement: string;
  "Identity:role": string;
  Contact: string;
  "Identity:user": string;
  "Identity:claimType": string;
  BoardOfDirectors: string;
  Investor: string;
  SupportCenter: string;
  Invest: string;
  Entrepreneur: string;
  SubmitYourProject: string;
  HowDoIFindTheNecessaryFunds: string;
  Institutional: string;
  AboutUs: string;
  OurTeam: string;
  Traveller: string;
  LogOut: string;
  InvestingCommittee: string;
  Campaigns: string;
  AdminCenter: string;
  EntrepreneurCenter: string;
  InvestorCenter: string;
  ChangeProfile: string;
  Register: string;
  MyAccount: string;
  TextTemplates: string;
  AdminManagement: string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): AbpUiNavigationResource {
  const navigationResource = resources.AbpUiNavigation?.texts;
  return {
    HomePage:
      navigationResource?.HomePage || data[lang]?.HomePage || data.en.Homepage,
    Dashboard:
      navigationResource?.Dashboard ||
      data[lang]?.Dashboard ||
      data.en.Dashboard,
    Management:
      navigationResource?.Management ||
      data[lang]?.Management ||
      data.en.Management,
    Crm: navigationResource?.Crm || data[lang]?.Crm || data.en.Crm,
    Profile:
      navigationResource?.Profile || data[lang]?.Profile || data.en.Profile,
    UserSettings:
      navigationResource?.UserSettings ||
      data[lang]?.UserSettings ||
      data.en.UserSettings,
    Details:
      navigationResource?.Details || data[lang]?.Details || data.en.Details,
    Companies:
      navigationResource?.Companies ||
      data[lang]?.Companies ||
      data.en.Companies,
    Template:
      navigationResource?.Template || data[lang]?.Template || data.en.Template,
    TenantSettings:
      navigationResource?.TenantSettings ||
      data[lang]?.TenantSettings ||
      data.en.TenantSettings,
    Contracts:
      navigationResource?.Contracts ||
      data[lang]?.Contracts ||
      data.en.Contracts,
    RebateTables:
      navigationResource?.RebateTables ||
      data[lang]?.RebateTables ||
      data.en.RebateTables,
    RefundTables:
      navigationResource?.RefundTables ||
      data[lang]?.RefundTables ||
      data.en.RefundTables,
    RefundFees:
      navigationResource?.RefundFees ||
      data[lang]?.RefundFees ||
      data.en.RefundFees,
    VATSettings:
      navigationResource?.VATSettings ||
      data[lang]?.VATSettings ||
      data.en.VATSettings,
    Settings:
      navigationResource?.Settings || data[lang]?.Settings || data.en.Settings,
    LanguageManagement:
      navigationResource?.LanguageManagement ||
      data[lang]?.LanguageManagement ||
      data.en.LanguageManagement,
    IdentityManagement:
      navigationResource?.IdentityManagement ||
      data[lang]?.IdentityManagement ||
      data.en.IdentityManagement,
    SaasManagement:
      navigationResource?.SaasManagement ||
      data[lang]?.SaasManagement ||
      data.en.SaasManagement,
    "Identity:role":
      navigationResource?.["Identity:role"] ||
      data[lang]?.["Identity:role"] ||
      data.en["Identity:role"] ||
      "",
    "Identity:user":
      navigationResource?.["Identity:user"] ||
      data[lang]?.["Identity:user"] ||
      data.en["Identity:user"] ||
      "",
    "Identity:claimType":
      navigationResource?.["Identity:claimType"] ||
      data[lang]?.["Identity:claimType"] ||
      data.en["Identity:claimType"] ||
      "",

    Investor:
      navigationResource?.Investor || data[lang]?.Investor || data.en.Investor,
    Invest: navigationResource?.Invest || data[lang]?.Invest || data.en.Invest,
    SupportCenter:
      navigationResource?.SupportCenter ||
      data[lang]?.SupportCenter ||
      data.en.SupportCenter,
    Entrepreneur:
      navigationResource?.Entrepreneur ||
      data[lang]?.Entrepreneur ||
      data.en.Entrepreneur,
    SubmitYourProject:
      navigationResource?.SubmitYourProject ||
      data[lang]?.SubmitYourProject ||
      data.en.SubmitYourProject,
    HowDoIFindTheNecessaryFunds:
      navigationResource?.HowDoIFindTheNecessaryFunds ||
      data[lang]?.HowDoIFindTheNecessaryFunds ||
      data.en.HowDoIFindTheNecessaryFunds,
    Institutional:
      navigationResource?.Institutional ||
      data[lang]?.Institutional ||
      data.en.Institutional,
    AboutUs:
      navigationResource?.AboutUs || data[lang]?.AboutUs || data.en.AboutUs,
    Contact:
      navigationResource?.Contact || data[lang]?.Contact || data.en.Contact,
    OurTeam:
      navigationResource?.OurTeam || data[lang]?.OurTeam || data.en.OurTeam,
    BoardOfDirectors:
      navigationResource?.BoardOfDirectors ||
      data[lang]?.BoardOfDirectors ||
      data.en.BoardOfDirectors,
    InvestingCommittee:
      navigationResource?.InvestingCommittee ||
      data[lang]?.InvestingCommittee ||
      data.en.InvestingCommittee,
    Campaigns:
      navigationResource?.Campaigns ||
      data[lang]?.Campaigns ||
      data.en.Campaigns,
    AdminCenter:
      navigationResource?.AdminCenter ||
      data[lang]?.AdminCenter ||
      data.en.AdminCenter,
    EntrepreneurCenter:
      navigationResource?.EntrepreneurCenter ||
      data[lang]?.EntrepreneurCenter ||
      data.en.EntrepreneurCenter,
    InvestorCenter:
      navigationResource?.InvestorCenter ||
      data[lang]?.InvestorCenter ||
      data.en.InvestorCenter,
    ChangeProfile:
      navigationResource?.ChangeProfile ||
      data[lang]?.ChangeProfile ||
      data.en.ChangeProfile,
    LogIn: navigationResource?.LogIn || data[lang]?.LogIn || data.en.LogIn,
    Register:
      navigationResource?.Register || data[lang]?.Register || data.en.Register,
    LogOut: navigationResource?.LogOut || data[lang]?.LogOut || data.en.LogOut,
    MyAccount:
      navigationResource?.MyAccount ||
      data[lang]?.MyAccount ||
      data.en.MyAccount,
    Add: navigationResource?.Add || data[lang]?.Add || data.en.Add,
    Traveller:
      navigationResource?.Traveller ||
      data[lang]?.Traveller ||
      data.en.Traveller,
    TextTemplates:
      navigationResource?.TextTemplates ||
      data[lang]?.TextTemplates ||
      data.en.TextTemplates,
    AdminManagement:
      navigationResource?.AdminManagement ||
      data[lang]?.AdminManagement ||
      data.en.AdminManagement,
  };
}
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: ResourceResult, lang: string) {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
