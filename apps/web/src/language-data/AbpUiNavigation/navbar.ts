import { getLocalizationResources } from "src/utils";

function getLanguageData(resources: any) {
  const navigationResource = resources?.AbpUiNavigation?.texts;
  return {
    HomePage: navigationResource?.HomePage || "Home Page", // "Ana Sayfa",
    Dashboard: navigationResource?.Dashboard || "Dashboard", // "Kontrol Paneli",
    Profile: navigationResource?.Profile || "Profile", // "Profil",
    Details: navigationResource?.Details || "Details", // "Detaylar",
    Templates: navigationResource?.Templates || "Templates", // "Sablonlar",
    Companies: navigationResource?.Companies || "Companies", // "Sirketler",
    CountrySettings: navigationResource?.CountrySettings || "Country Settings", //"Ülke Ayarları",
    Settings: navigationResource?.Settings || "Settings", // "Ayarlar",
    LanguageManagement:
      navigationResource?.LanguageManagement || "Language Management", //"Dil Yönetimi",
    IdentityManagement:
      navigationResource?.IdentityManagement || "Identity Management", //"Kimlik Yönetimi",
    SaasManagement: navigationResource?.SaasManagement || "SaaS Management", //"SaaS Yönetimi",
    "Identity:role": navigationResource?.["Identity:role"] || "Roles", // "Roller",
    "Identity:user": navigationResource?.["Identity:user"] || "Users", // "Kullanıcılar",
    "Identity:claimType":
      navigationResource?.["Identity:claimType"] || "Claim Types", // "Talep Türleri",

    Investor: navigationResource?.Investor || "Investor", // "Yatırımcı",
    Invest: navigationResource?.Invest || "Invest", // "Yatırım Yap",
    SupportCenter: navigationResource?.SupportCenter || "Support Center", // "Destek Merkezi",
    Entrepreneur: navigationResource?.Entrepreneur || "Entrepreneur", // "Girişimci",
    SubmitYourProject:
      navigationResource?.SubmitYourProject || "Submit Your Project", // "Projeni gönder",
    HowDoIFindTheNecessaryFunds:
      navigationResource?.HowDoIFindTheNecessaryFunds ||
      "How do I find the necessary funds?", //"Gerekli fonu nasıl bulurum?",
    Institutional: navigationResource?.Institutional || "Institutional", // "Kurumsal",
    AboutUs: navigationResource?.AboutUs || "About Us", // "Hakkımızda",
    Contact: navigationResource?.Contact || "Contact", // "İletişim",
    OurTeam: navigationResource?.OurTeam || "Our Team", // "Takımımız",
    BoardOfDirectors:
      navigationResource?.BoardOfDirectors || "Board of Directors", // "Yönetim kurulumuz",
    InvestingCommittee:
      navigationResource?.InvestingCommittee || "Investing committee", //"Yatırım komitesi",
    Campaigns: navigationResource?.Campaigns || "Campaigns", // "Kampanyalar",
    AdminCenter: navigationResource?.AdminCenter || "Admin Center", // "Yönetim Merkezi",
    EntrepreneurCenter:
      navigationResource?.EntrepreneurCenter || "Entrepreneur Center", // "Girişimci Merkezi",
    InvestorCenter: navigationResource?.InvestorCenter || "Investor Center", //"Yatırımcı Merkezi",
    ChangeProfile: navigationResource?.ChangeProfile || "Change Profile", //"Profili Değiştir",
    LogIn: navigationResource?.LogIn || "Login",
    Register: navigationResource?.Register || "Register",
    LogOut: navigationResource?.LogOut || "Log Out", // "Çıkış Yap",
    MyAccount: resources?.AbpUiNavigation?.texts?.MyAccount || "My Account",
    Add: resources?.AbpUiNavigation?.texts?.Add || "Add",
  };
}
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: any) {
  const languageData = getLanguageData(resources);
  return languageData;
}
