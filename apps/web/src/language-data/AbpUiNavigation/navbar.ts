import { getLocalizationResources } from "src/utils";

export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const navigationResource = resources?.["AbpUiNavigation"]?.texts;
  const languageData = {
    Investor: navigationResource?.Investor || "Investor" || "Yatırımcı",
    Invest: navigationResource?.Invest || "Invest" || "Yatırım Yap",
    SupportCenter:
      navigationResource?.SupportCenter || "Support Center" || "Destek Merkezi",
    Entrepreneur:
      navigationResource?.Entrepreneur || "Entrepreneur" || "Girişimci",
    SubmitYourProject:
      navigationResource?.SubmitYourProject ||
      "Submit Your Project" ||
      "Projeni gönder",
    HowDoIFindTheNecessaryFunds:
      navigationResource?.HowDoIFindTheNecessaryFunds ||
      "How do I find the necessary funds?" ||
      "Gerekli fonu nasıl bulurum?",
    Institutional:
      navigationResource?.Institutional || "Institutional" || "Kurumsal",
    AboutUs: navigationResource?.AboutUs || "About Us" || "Hakkımızda",
    Contact: navigationResource?.Contact || "Contact" || "İletişim",
    OurTeam: navigationResource?.OurTeam || "Our Team" || "Takımımız",
    BoardOfDirectors:
      navigationResource?.BoardOfDirectors ||
      "Board of Directors" ||
      "Yönetim kurulumuz",
    InvestingCommittee:
      navigationResource?.InvestingCommittee ||
      "Investing committee" ||
      "Yatırım komitesi",
    Campaigns: navigationResource?.Campaigns || "Campaigns" || "Kampanyalar",
    AdminCenter:
      navigationResource?.AdminCenter || "Admin Center" || "Yönetim Merkezi",
    EntrepreneurCenter:
      navigationResource?.EntrepreneurCenter ||
      "Entrepreneur Center" ||
      "Girişimci Merkezi",
    InvestorCenter:
      navigationResource?.InvestorCenter ||
      "Investor Center" ||
      "Yatırımcı Merkezi",
    ChangeProfile:
      navigationResource?.ChangeProfile ||
      "Change Profile" ||
      "Profili Değiştir",
    LogOut: navigationResource?.LogOut || "Log Out" || "Çıkış Yap",
  };
  return {
    languageData,
    resources,
  };
}
