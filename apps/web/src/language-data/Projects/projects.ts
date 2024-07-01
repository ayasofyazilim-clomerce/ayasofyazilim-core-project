import { getLocalizationResources } from "src/utils";

export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const projectResource = resources?.["ProjectService"]?.texts;
  const accountResource = resources?.AbpAccount?.texts;
  const languageData = {
    Projects: projectResource?.Projects || "Projects",
    LogIn: resources?.AbpUiNavigation?.texts?.["LogIn"] || "Login",
    DaysLeft: projectResource?.["DaysLeft"] || "Days left",
    InvestNow: projectResource?.["InvestNow"] || "Invest Now",
    InvestmentOpportunities:
      projectResource?.["InvestmentOpportunities"] ||
      "Investment Opportunitiesies",
    ProjectsToOpenForInvestmentSoon:
      projectResource?.["ProjectsToOpenForInvestmentSoon"] ||
      "Projects to open for investment soon",
    StartingSoon: projectResource?.["StartingSoon"] || "Starting Soon",
    CampaignStartDate:
      projectResource?.["CampaignStartDate"] || "Campaign start date",
    CampaignEndDate:
      projectResource?.["CampaignEndDate"] || "Campaign end date",
    CampaignEnded: projectResource?.["CampaignEnded"] || "Campaign Ended",
    CollectedAmount: projectResource?.["CollectedAmount"] || "Collected amount",
    TargetAmount: projectResource?.["TargetAmount"] || "Target amount",
    Investor: projectResource?.["Investor"] || "Investor",
    QualifiedInvestor:
      projectResource?.["QualifiedInvestor"] || "Qualified Investor",
    Invest: projectResource?.["Invest"] || "Invest",
    TargetReached:
      projectResource?.["TargetReached"] || "{target}% of target reached",
    CreateProject: projectResource?.["CreateProject"] || "Create Project",
    ProjectDetails: projectResource?.["ProjectDetails"] || "Project Details",
    AdditionalFunding:
      projectResource?.["AdditionalFunding"] || "Additional Funding",
    Summary: projectResource?.["Summary"] || "Summary",
    ViewProject: projectResource?.["ViewProject"] || "View Project",
    "Messages:ProjectCreated":
      projectResource?.["Messages:ProjectCreated"] ||
      "The project has been created successfully.",
    "Messages:ProjectCreationError":
      projectResource?.["Messages:ProjectCreationError"] ||
      "An error occurred while creating the project.",
    ProjectName: projectResource?.["ProjectName"] || "Project name",
    ProjectNameInfo:
      projectResource?.["ProjectNameInfo"] ||
      "A headline that describes your project in a way that attracts investors' attention.",
    ProjectDescription:
      projectResource?.["ProjectDescription"] || "Project description",
    ProjectDescriptionInfo:
      projectResource?.["ProjectDescriptionInfo"] ||
      "Briefly describe your project in a way that attracts investors' attention.",
    FundCollectionType:
      projectResource?.["FundCollectionType"] || "Project type",
    FundCollectionTypeInfo:
      projectResource?.["FundCollectionTypeInfo"] || "Type of your project.",
    FundCollectionTypeSHRE:
      projectResource?.["FundCollectionTypeSHRE"] || "Share based",
    FundCollectionTypeDBIT:
      projectResource?.["FundCollectionTypeDBIT"] || "Dept based",
    FundableAmount: projectResource?.["FundableAmount"] || "Fundable amount",
    FundableAmountInfo:
      projectResource?.["FundableAmountInfo"] ||
      "The amount of investment you want to make in your project.",

    AdditionalFundingInfo:
      projectResource?.["AdditionalFundingInfo"] ||
      "When your project reaches the fundable amount, should extra funds continue to be collected up to the amount you specify?",
    AdditionalFundingYes: projectResource?.["AdditionalFundingYes"] || "Yes",
    AdditionalFundingNo: projectResource?.["AdditionalFundingNo"] || "No",
    AdditionalFundingRate:
      projectResource?.["AdditionalFundingRate"] ||
      "Rate of additional funding",
    AdditionalFundingRateInfo:
      projectResource?.["AdditionalFundingRateInfo"] ||
      "The rate of additional funding that will be collected in case your project is overfunded.",
    "IHaveReadAndAccept {0}":
      projectResource?.["IHaveReadAndAccept {0}"] || "I have read and accept",
    EFTOrMoneyTransfer:
      projectResource?.["EFTOrMoneyTransfer"] || "EFT/Money Transfer",
    RiskDeclarationForm:
      projectResource?.["RiskDeclarationForm"] || "Risk Declaration Form",
    ProjectInformationForm:
      projectResource?.["ProjectInformationForm"] || "Project Information Form",
    IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice:
      projectResource?.[
        "IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice"
      ] ||
      "I acknowledge that the investment platform does not give investment advices.",
    CreditCard: projectResource?.["CreditCard"] || "Credit Card",
    YouCanInvestWithCreditCardOrEft:
      projectResource?.["YouCanInvestWithCreditCardOrEft"] ||
      "You can invest with Credit Card or Eft",
    InvestmentAmount:
      projectResource?.["InvestmentAmount"] || "Investment Amount",
    InvestmentMethod:
      projectResource?.["InvestmentMethod"] || "Investment Method",
    RemainingTime: projectResource?.["RemainingTime"] || "Remaining Time",
    QualifiedFundRate:
      projectResource?.["QualifiedFundRate"] || "Qualified Fund Rate",
    InvestingProfile:
      projectResource?.["InvestingProfile"] || "Investing Profile",
    Share: projectResource?.["Share"] || "Share",
    "DisplayName:Email": accountResource?.["DisplayName:Email"] || "Email",
    "DisplayName:PhoneNumber":
      accountResource?.["DisplayName:Phone"] || "Phone",
    "DisplayName:Name": accountResource?.["DisplayName:Name"] || "Name",
    "DisplayName:Surname":
      accountResource?.["DisplayName:Surname"] || "Surname",
  };
  return {
    languageData,
    resources,
  };
}
