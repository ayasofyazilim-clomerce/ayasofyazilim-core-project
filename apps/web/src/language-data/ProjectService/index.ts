import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface ProjectServiceResult {
  Next: string;
  Previous: string;
  Summary: string;
  Projects: string;
  LogIn: string;
  HomePage: string;
  DaysLeft: string;
  InvestNow: string;
  Invest: string;
  Share: string;
  InvestmentOpportunities: string;
  ProjectsToOpenForInvestmentSoon: string;
  StartingSoon: string;
  CampaignStartDate: string;
  CampaignEndDate: string;
  CampaignEnded: string;
  CollectedAmount: string;
  TargetAmount: string;
  Investor: string;
  QualifiedInvestor: string;
  TargetReached: string;
  CreateProject: string;
  ProjectDetails: string;
  AdditionalFunding: string;
  ViewProject: string;
  "Messages:ProjectCreated": string;
  "Messages:ProjectCreationError": string;
  ProjectName: string;
  ProjectNameInfo: string;
  ProjectDescription: string;
  ProjectDescriptionInfo: string;
  FundCollectionType: string;
  FundCollectionTypeInfo: string;
  FundCollectionTypeSHRE: string;
  FundCollectionTypeDBIT: string;
  FundableAmount: string;
  FundableAmountInfo: string;
  ProjectStartDateInfo: string;
  AdditionalFundingInfo: string;
  AdditionalFundingYes: string;
  AdditionalFundingNo: string;
  AdditionalFundingRate: string;
  AdditionalFundingRateInfo: string;
  "IHaveReadAndAccept {0}": string;
  EFTOrMoneyTransfer: string;
  RiskDeclarationForm: string;
  ProjectInformationForm: string;
  IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice: string;
  CreditCard: string;
  YouCanInvestWithCreditCardOrEft: string;
  InvestmentAmount: string;
  InvestmentMethod: string;
  RemainingTime: string;
  QualifiedFundRate: string;
  InvestingProfile: string;
  "DisplayName:Email": string;
  "DisplayName:PhoneNumber": string;
  "DisplayName:Name": string;
  "DisplayName:Surname": string;
  SEND_FOR_APPROVAL: string;
  IN_DRAFT_STAGE: string;
  SENT_FOR_APPROVAL: string;
  NOT_APPROVED: string;
  APPROVED: string;
  FUNDABLE: string;
  FUNDING_SUCCESSFUL: string;
  FUNDING_UNSUCCESSFUL: string;
  FUNDING_COMPLETED: string;
}

function getLanguageData(
  resources: ResourceResult,
  lang: string,
): ProjectServiceResult {
  const projectResource = resources.ProjectService?.texts;
  const accountResource = resources.AbpAccount?.texts;
  const uiResource = resources.AbpUi?.texts;
  const navigationResource = resources.AbpUiNavigation?.texts;
  return {
    Next: uiResource?.PagerNext || data[lang]?.Next || data.en.Next,
    Previous:
      uiResource?.PagerPrevious || data[lang]?.Previous || data.en.Previous,
    Summary: uiResource?.Summary || data[lang]?.Summary || data.en.Summary,
    Projects:
      projectResource?.Projects || data[lang]?.Projects || data.en.Projects,
    LogIn:
      resources.AbpUiNavigation?.texts?.LogIn ||
      data[lang]?.LogIn ||
      data.en.LogIn,
    HomePage:
      navigationResource?.HomePage || data[lang]?.HomePage || data.en.HomePage,
    DaysLeft:
      projectResource?.DaysLeft || data[lang]?.DaysLeft || data.en.DaysLeft,
    InvestNow:
      projectResource?.InvestNow || data[lang]?.InvestNow || data.en.InvestNow,
    InvestmentOpportunities:
      projectResource?.InvestmentOpportunities ||
      data[lang]?.InvestmentOpportunities ||
      data.en.InvestmentOpportunities,
    ProjectsToOpenForInvestmentSoon:
      projectResource?.ProjectsToOpenForInvestmentSoon ||
      "Projects to open for investment soon",
    StartingSoon:
      projectResource?.StartingSoon ||
      data[lang]?.StartingSoon ||
      data.en.StartingSoon,
    CampaignStartDate:
      projectResource?.CampaignStartDate ||
      data[lang]?.CampaignStartDate ||
      data.en.CampaignStartDate,
    CampaignEndDate:
      projectResource?.CampaignEndDate ||
      data[lang]?.CampaignEndDate ||
      data.en.CampaignEndDate,
    CampaignEnded:
      projectResource?.CampaignEnded ||
      data[lang]?.CampaignEnded ||
      data.en.CampaignEnded,
    CollectedAmount:
      projectResource?.CollectedAmount ||
      data[lang]?.CollectedAmount ||
      data.en.CollectedAmount,
    TargetAmount:
      projectResource?.TargetAmount ||
      data[lang]?.TargetAmount ||
      data.en.TargetAmount,
    Investor:
      projectResource?.Investor || data[lang]?.Investor || data.en.Investor,
    QualifiedInvestor:
      projectResource?.QualifiedInvestor ||
      data[lang]?.QualifiedInvestor ||
      data.en.QualifiedInvestor,
    Invest: projectResource?.Invest || data[lang]?.Invest || data.en.Invest,
    TargetReached:
      projectResource?.TargetReached ||
      data[lang]?.TargetReached ||
      data.en.TargetReached,
    CreateProject:
      projectResource?.CreateProject ||
      data[lang]?.CreateProject ||
      data.en.CreateProject,
    ProjectDetails:
      projectResource?.ProjectDetails ||
      data[lang]?.ProjectDetails ||
      data.en.ProjectDetails,
    AdditionalFunding:
      projectResource?.AdditionalFunding ||
      data[lang]?.AdditionalFunding ||
      data.en.AdditionalFunding,
    ViewProject:
      projectResource?.ViewProject ||
      data[lang]?.ViewProject ||
      data.en.ViewProject,
    "Messages:ProjectCreated":
      projectResource?.["Messages:ProjectCreated"] ||
      data[lang]?.["Messages:ProjectCreated"] ||
      data.en["Messages:ProjectCreated"] ||
      "",
    "Messages:ProjectCreationError":
      projectResource?.["Messages:ProjectCreationError"] ||
      data[lang]?.["Messages:ProjectCreationError"] ||
      data.en["Messages:ProjectCreationError"] ||
      "",
    ProjectName:
      projectResource?.ProjectName ||
      data[lang]?.ProjectName ||
      data.en.ProjectName,
    ProjectNameInfo:
      projectResource?.ProjectNameInfo ||
      data[lang]?.ProjectNameInfo ||
      data.en.ProjectNameInfo,
    ProjectDescription:
      projectResource?.ProjectDescription ||
      data[lang]?.ProjectDescription ||
      data.en.ProjectDescription,
    ProjectDescriptionInfo:
      projectResource?.ProjectDescriptionInfo ||
      data[lang]?.ProjectDescriptionInfo ||
      data.en.ProjectDescriptionInfo,
    FundCollectionType:
      projectResource?.FundCollectionType ||
      data[lang]?.FundCollectionType ||
      data.en.FundCollectionType,
    FundCollectionTypeInfo:
      projectResource?.FundCollectionTypeInfo ||
      data[lang]?.FundCollectionTypeInfo ||
      data.en.FundCollectionTypeInfo,
    FundCollectionTypeSHRE:
      projectResource?.FundCollectionTypeSHRE ||
      data[lang]?.FundCollectionTypeSHRE ||
      data.en.FundCollectionTypeSHRE,
    FundCollectionTypeDBIT:
      projectResource?.FundCollectionTypeDBIT ||
      data[lang]?.FundCollectionTypeDBIT ||
      data.en.FundCollectionTypeDBIT,
    FundableAmount:
      projectResource?.FundableAmount ||
      data[lang]?.FundableAmount ||
      data.en.FundableAmount,
    FundableAmountInfo:
      projectResource?.FundableAmountInfo ||
      data[lang]?.FundableAmountInfo ||
      data.en.FundableAmountInfo,
    ProjectStartDateInfo:
      projectResource?.ProjectStartDateInfo ||
      data[lang]?.ProjectStartDateInfo ||
      data.en.ProjectStartDateInfo,
    AdditionalFundingInfo:
      projectResource?.AdditionalFundingInfo ||
      data[lang]?.AdditionalFundingInfo ||
      data.en.AdditionalFundingInfo,
    AdditionalFundingYes:
      projectResource?.AdditionalFundingYes ||
      data[lang]?.AdditionalFundingYes ||
      data.en.AdditionalFundingYes,
    AdditionalFundingNo:
      projectResource?.AdditionalFundingNo ||
      data[lang]?.AdditionalFundingNo ||
      data.en.AdditionalFundingNo,
    AdditionalFundingRate:
      projectResource?.AdditionalFundingRate ||
      data[lang]?.AdditionalFundingRate ||
      data.en.AdditionalFundingRate,
    AdditionalFundingRateInfo:
      projectResource?.AdditionalFundingRateInfo ||
      data[lang]?.AdditionalFundingRateInfo ||
      data.en.AdditionalFundingRateInfo,
    "IHaveReadAndAccept {0}":
      projectResource?.["IHaveReadAndAccept {0}"] ||
      data[lang]?.["IHaveReadAndAccept {0}"] ||
      data.en["IHaveReadAndAccept {0}"] ||
      "",
    EFTOrMoneyTransfer:
      projectResource?.EFTOrMoneyTransfer ||
      data[lang]?.EFTOrMoneyTransfer ||
      data.en.EFTOrMoneyTransfer,
    RiskDeclarationForm:
      projectResource?.RiskDeclarationForm ||
      data[lang]?.RiskDeclarationForm ||
      data.en.RiskDeclarationForm,
    ProjectInformationForm:
      projectResource?.ProjectInformationForm ||
      data[lang]?.ProjectInformationForm ||
      data.en.ProjectInformationForm,
    IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice:
      projectResource?.IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice ||
      data[lang]
        ?.IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice ||
      data.en.IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice,
    CreditCard:
      projectResource?.CreditCard ||
      data[lang]?.CreditCard ||
      data.en.CreditCard,
    YouCanInvestWithCreditCardOrEft:
      projectResource?.YouCanInvestWithCreditCardOrEft ||
      data[lang]?.YouCanInvestWithCreditCardOrEft ||
      data.en.YouCanInvestWithCreditCardOrEft,
    InvestmentAmount:
      projectResource?.InvestmentAmount ||
      data[lang]?.InvestmentAmount ||
      data.en.InvestmentAmount,
    InvestmentMethod:
      projectResource?.InvestmentMethod ||
      data[lang]?.InvestmentMethod ||
      data.en.InvestmentMethod,
    RemainingTime:
      projectResource?.RemainingTime ||
      data[lang]?.RemainingTime ||
      data.en.RemainingTime,
    QualifiedFundRate:
      projectResource?.QualifiedFundRate ||
      data[lang]?.QualifiedFundRate ||
      data.en.QualifiedFundRate,
    InvestingProfile:
      projectResource?.InvestingProfile ||
      data[lang]?.InvestingProfile ||
      data.en.InvestingProfile,
    Share: projectResource?.Share || data[lang]?.Share || data.en.Share,
    "DisplayName:Email":
      accountResource?.["DisplayName:Email"] ||
      data[lang]?.["DisplayName:Email"] ||
      data.en["DisplayName:Email"] ||
      "",
    "DisplayName:PhoneNumber":
      accountResource?.["DisplayName:Phone"] ||
      data[lang]?.["DisplayName:Phone"] ||
      data.en["DisplayName:Phone"] ||
      "",
    "DisplayName:Name":
      accountResource?.["DisplayName:Name"] ||
      data[lang]?.["DisplayName:Name"] ||
      data.en["DisplayName:Name"] ||
      "",
    "DisplayName:Surname":
      accountResource?.["DisplayName:Surname"] ||
      data[lang]?.["DisplayName:Surname"] ||
      data.en["DisplayName:Surname"] ||
      "",
    SEND_FOR_APPROVAL:
      projectResource?.SEND_FOR_APPROVAL ||
      data[lang]?.SEND_FOR_APPROVAL ||
      data.en.SEND_FOR_APPROVAL,
    IN_DRAFT_STAGE:
      projectResource?.IN_DRAFT_STAGE ||
      data[lang]?.IN_DRAFT_STAGE ||
      data.en.IN_DRAFT_STAGE,
    SENT_FOR_APPROVAL:
      projectResource?.SENT_FOR_APPROVAL ||
      data[lang]?.SENT_FOR_APPROVAL ||
      data.en.SENT_FOR_APPROVAL,
    NOT_APPROVED:
      projectResource?.NOT_APPROVED ||
      data[lang]?.NOT_APPROVED ||
      data.en.NOT_APPROVED,
    APPROVED:
      projectResource?.APPROVED || data[lang]?.APPROVED || data.en.APPROVED,
    FUNDABLE:
      projectResource?.FUNDABLE || data[lang]?.FUNDABLE || data.en.FUNDABLE,
    FUNDING_SUCCESSFUL:
      projectResource?.FUNDING_SUCCESSFUL ||
      data[lang]?.FUNDING_SUCCESSFUL ||
      data.en.FUNDING_SUCCESSFUL,
    FUNDING_UNSUCCESSFUL:
      projectResource?.FUNDING_UNSUCCESSFUL ||
      data[lang]?.FUNDING_UNSUCCESSFUL ||
      data.en.FUNDING_UNSUCCESSFUL,
    FUNDING_COMPLETED:
      projectResource?.FUNDING_COMPLETED ||
      data[lang]?.FUNDING_COMPLETED ||
      data.en.FUNDING_COMPLETED,
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
