import { CountrySettingDto } from "./types";

export const countrySettingsResponse: CountrySettingDto = {
  isEnabled: true,
  groups: [
    {
      isEnabled: true,
      key: "CountryManagement.IssuingFieldManagement",
      displayName: "Issuing - Field management",
      description:
        "Select the applicable information to issue Tax Free tags in this country",
      items: [
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: false,
          isActive: true,
          pattern: null,
          depth: 0,
          description: "test",
          displayName: "Parent Display",
          key: "Parentasd",
          parentName: null,
          value: null,
          defaultValue: "true",
          bonds: [
            {
              key: "Parentasd.ChildToggle",
              pattern: "^false$",
              type: "DISABLES",
            },
          ],
          subItems: [
            {
              isEnabled: true,
              isApplicable: true,
              isRequired: false,
              isActive: true,
              pattern: null,
              depth: 0,
              description: null,
              displayName: "Password",
              key: "Password",
              parentName: null,
              value: null,
              defaultValue: null,
              bonds: [
                {
                  key: "ChildToggle",
                  pattern: "^false$",
                  type: "DISABLES",
                },
              ],
              subItems: [
                {
                  isEnabled: true,
                  isApplicable: true,
                  isRequired: false,
                  isActive: true,
                  pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
                  depth: 0,
                  description:
                    "If traveller's passport is required while issuing.",
                  displayName: "Make mandatory",
                  key: "MakeMandatory", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
                  parentName: null,
                  value: "18",
                  defaultValue: null,
                  bonds: [],
                  subItems: [],
                  valueType: {
                    itemSource: null,
                    name: "ToggleStringValueType",
                    properties: "{}",
                    validator: {
                      name: "BOOLEAN",
                      properties: {
                        minValue: 0,
                        maxValue: 0,
                      },
                    },
                  },
                },
                {
                  isEnabled: true,
                  isApplicable: true,
                  isRequired: false,
                  isActive: true,
                  pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
                  depth: 0,
                  description:
                    "If traveller's passport is required while issuing.",
                  displayName: "Make mandatory",
                  key: "Makemandatory2", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
                  parentName: null,
                  value: "18",
                  defaultValue: null,
                  bonds: [],
                  subItems: [],
                  valueType: {
                    itemSource: null,
                    name: "ToggleStringValueType",
                    properties: "{}",
                    validator: {
                      name: "BOOLEAN",
                      properties: {
                        minValue: 0,
                        maxValue: 0,
                      },
                    },
                  },
                },
              ],
              valueType: {
                itemSource: null,
                name: null,
                properties: "{}",
                validator: {
                  name: null,
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: true,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description: null,
              displayName: "ChildInput",
              key: "ChildInput",
              parentName: null,
              value: "0",
              defaultValue: "0",
              bonds: [],
              subItems: [],
              valueType: {
                itemSource: null,
                name: "FreeTextStringValueType",
                properties: "{}",
                validator: {
                  name: "NUMERIC",
                  properties: {
                    minValue: 0,
                    maxValue: 2147483647,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: true,
              isRequired: false,
              isActive: true,
              pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
              depth: 0,
              description: "If traveller's passport is required while issuing.",
              displayName: "ChildToggle",
              key: "ChildToggle", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "false",
              bonds: [],
              subItems: [],
              valueType: {
                itemSource: null,
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: null,
            name: null,
            properties: "{}",
            validator: {
              name: null,
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: false,
          isActive: true,
          pattern: null,
          depth: 0,
          description: "",
          displayName: "DateOfBirth",
          key: "DateOfBirth",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: true,
              isRequired: false,
              isActive: true,
              pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
              depth: 0,
              description: "If traveller's passport is required while issuing.",
              displayName: "MakeMandatory",
              key: "MakeMandatory", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: [],
              valueType: {
                itemSource: null,
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: true,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "Minimum age a traveller should be to be eligible to shop Tax Free. Leave empty or 0 (zero) if you don't want to apply the rule.",
              displayName: "MinimumTravellerAge",
              key: "MinimumTravellerAge",
              parentName: null,
              value: "0",
              defaultValue: "0",
              bonds: [
                {
                  key: "MakeMandatory",
                  pattern: "^false$",
                  type: "DISABLES",
                },
              ],
              subItems: [],
              valueType: {
                itemSource: null,
                name: "FreeTextStringValueType",
                properties: "{}",
                validator: {
                  name: "NUMERIC",
                  properties: {
                    minValue: 0,
                    maxValue: 2147483647,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: null,
            name: null,
            properties: "{}",
            validator: {
              name: null,
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName: "FormAlertAmount",
          key: "FormAlertAmount",
          parentName: null,
          value: "true",
          defaultValue: "true",
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 2147483647,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName: "Formrefillfactor",
          key: "Formrefillfactor",
          parentName: null,
          value: "0",
          defaultValue: "0",
          bonds: [
            {
              key: "FormAlertAmount",
              pattern: "^true$",
              type: "DISABLES",
            },
          ],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 2147483647,
              },
            },
          },
        },
      ],
    },
    {
      isEnabled: true,
      key: "CountryManagement.Services",
      displayName: "Services",
      description:
        "Select the applicable information to issue Tax Free tags in this country",
      items: [
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Exchange", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: null,
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Tour guide", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: null,
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Eligibility Service", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description:
            "Number of hours that the last eligibility check is valid for. Leave empty or 0 (zero) if eligibility check should be done every time it is required.",
          displayName: "MakeMandatory",
          key: "Eligibility check result validity (hours)", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "0",
          defaultValue: "0",
          bonds: [
            {
              key: "Eligibility Service",
              pattern: "^false$",
              type: "DISABLES",
            },
          ],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Allow eligibility complaint", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: null,
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
      ],
    },
    {
      isEnabled: true,
      key: "CountryManagement.Invoicing",
      displayName: "Invoicing",
      description: "CountryManagement.InputExample.Description",
      items: [
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: false,
          isActive: true,
          pattern: "trial",
          depth: 0,
          description: "",
          displayName: "LDAP Login",
          key: "Invoice sale type",
          parentName: null,
          value: "Optional",
          defaultValue: "Single Sale",
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: {
              items: [
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item0.DisplayText.Name.Optional",
                    resourceName: "SettingService",
                  },
                  value: "Single Sale",
                },
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                    resourceName: "SettingService",
                  },
                  value: "Double Sale",
                },
              ],
            },
            name: "SelectionStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Rebate", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: "true",
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: false,
          isActive: true,
          pattern: "trial",
          depth: 0,
          description: "",
          displayName: "LDAP Login",
          key: "Rebate invoicing",
          parentName: null,
          value: "Optional",
          defaultValue: "Advice",
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: {
              items: [
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item0.DisplayText.Name.Optional",
                    resourceName: "SettingService",
                  },
                  value: "None",
                },
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                    resourceName: "SettingService",
                  },
                  value: "Advice",
                },
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                    resourceName: "SettingService",
                  },
                  value: "Self-billing Invoice",
                },
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                    resourceName: "SettingService",
                  },
                  value: "Both",
                },
              ],
            },
            name: "SelectionStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: "",
          displayName: "WelcomeText",
          key: "Min amount of rebate",
          parentName: null,
          value: "0",
          defaultValue: "250",
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "STRING",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Ropo invoice service", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: null,
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Invoicing exported", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: null,
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
          depth: 0,
          description: "",
          displayName: "MakeMandatory",
          key: "Direct Debit", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
          parentName: null,
          value: "true",
          defaultValue: null,
          bonds: [],
          subItems: [],
          valueType: {
            itemSource: null,
            name: "BooleanValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
      ],
    },
  ],
};

export const countrySettingsResponse2: CountrySettingDto = {
  isEnabled: true,
  groups: [
    {
      isEnabled: true,
      key: "CountryManagement.InputExample",
      displayName: "CountryManagement.InputExample.DisplayName",
      description: null,
      items: [
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.InputExample.ToggleInputExample.DisplayName",
          key: "CountryManagement.InputExample.ToggleInputExample",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "ToggleStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.InputExample.NumericInputExample.Description",
          displayName:
            "CountryManagement.InputExample.NumericInputExample.DisplayName",
          key: "CountryManagement.InputExample.NumericInputExample",
          parentName: null,
          value: "0",
          defaultValue: "0",
          bonds: [
            {
              key: "CountryManagement.InputExample.ToggleInputExample",
              pattern: "^false$",
              type: "DISABLES",
            },
            {
              key: "CountryManagement.InputExample.SelectableInputExample",
              pattern: "^SingleSale$",
              type: "HIDES",
            },
            {
              key: "CountryManagement.InputExample.StringInputExample",
              pattern: "^SingleSale$",
              type: "REQUIRES",
            },
          ],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 2147483647,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.InputExample.StringInputExample.Description",
          displayName:
            "CountryManagement.InputExample.StringInputExample.DisplayName",
          key: "CountryManagement.InputExample.StringInputExample",
          parentName: null,
          value: "Trial",
          defaultValue: "Trial",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "STRING",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.InputExample.SelectableInputExample.Description",
          displayName:
            "CountryManagement.InputExample.SelectableInputExample.DisplayName",
          key: "CountryManagement.InputExample.SelectableInputExample",
          parentName: null,
          value: "Optional",
          defaultValue: "Optional",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item0.DisplayText.Name.Days",
                    resourceName: "SettingService",
                  },
                  value: "Days",
                },
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Months",
                    resourceName: "SettingService",
                  },
                  value: "Months",
                },
                {
                  displayText: {
                    name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item2.DisplayText.Name.Forced",
                    resourceName: "SettingService",
                  },
                  value: "Forced",
                },
              ],
            },
            name: "SelectionStringValueType",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
      ],
    },
    {
      isEnabled: true,
      key: "CountryManagement.IssuingFieldManagement",
      displayName: "CountryManagement.IssuingFieldManagement.DisplayName",
      description: "CountryManagement.IssuingFieldManagement.Description",
      items: [
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.Passport.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.Passport",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.Passport.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.Passport.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "true",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.Name.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.Name",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.Name.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.Name.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.Name.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "true",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.DateOfBirth.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.DateOfBirth",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.DateOfBirth.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.DateOfBirth.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.DateOfBirth.MakeMandatory",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.DateOfBirth.MinimumTravellerAge.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.DateOfBirth.MinimumTravellerAge.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.DateOfBirth.MinimumTravellerAge",
              parentName: null,
              value: "0",
              defaultValue: "0",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "NUMERIC",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: false,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.PhoneNumber.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.PhoneNumber",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.PhoneNumber.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.PhoneNumber.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.PhoneNumber.MakeMandatory",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.CountryOfResidence.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.CountryOfResidence",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.CountryOfResidence.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.CountryOfResidence.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.CountryOfResidence.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "true",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.Nationality.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.Nationality",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.Nationality.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.Nationality.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.Nationality.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "true",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.Factura.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.Factura",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.Factura.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.Factura.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.Factura.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "true",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: false,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.ReceiptDate.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.ReceiptDate",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.ReceiptDate.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.ReceiptDate.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.ReceiptDate.MakeMandatory",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.ReceiptDate.ValidityDays.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.ReceiptDate.ValidityDays.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.ReceiptDate.ValidityDays",
              parentName: null,
              value: "0",
              defaultValue: "0",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "NUMERIC",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description: null,
              displayName:
                "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.Value.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.Value",
              parentName: null,
              value: "90",
              defaultValue: "90",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "NUMERIC",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description: null,
              displayName:
                "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.TimeRange.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.TimeRange",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description: null,
              displayName:
                "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.StartingNextMonth.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.IssuedFormValidityTerm.StartingNextMonth",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.Sticker.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.Sticker",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.Sticker.MakeMandatory.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.Sticker.MakeMandatory.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.Sticker.MakeMandatory",
              parentName: null,
              value: "true",
              defaultValue: "true",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.Packages.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.Packages",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.UniRefundVoucher.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.UniRefundVoucher",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.VATValidation.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.VATValidation.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.VATValidation",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: true,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.IsMinSalesAmountNetto.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.IsMinSalesAmountNetto.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.IsMinSalesAmountNetto",
          parentName: null,
          value: null,
          defaultValue: null,
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "",
            properties: "{}",
            validator: {
              name: "",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: "^(100|[1-9]?[0-9])$",
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.VATValidationMaxDifference.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.VATValidationMaxDifference.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.VATValidationMaxDifference",
          parentName: null,
          value: "1",
          defaultValue: null,
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.MinimumSalesAmount.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.MinimumSalesAmount",
          parentName: null,
          value: "1100",
          defaultValue: "1100",
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.IssuingFieldManagement.MinimumSalesAmount.PerVAT.Description",
              displayName:
                "CountryManagement.IssuingFieldManagement.MinimumSalesAmount.PerVAT.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.MinimumSalesAmount.PerVAT",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description: null,
              displayName:
                "CountryManagement.IssuingFieldManagement.MinimumSalesAmount.PerFactura.DisplayName",
              key: "CountryManagement.IssuingFieldManagement.MinimumSalesAmount.PerFactura",
              parentName: null,
              value: "false",
              defaultValue: "false",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "ToggleStringValueType",
                properties: "{}",
                validator: {
                  name: "BOOLEAN",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.MaxNumberOfFactura.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.MaxNumberOfFactura.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.MaxNumberOfFactura",
          parentName: null,
          value: "8",
          defaultValue: "8",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.IssuingFieldManagement.FormAlertAmount.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.FormAlertAmount",
          parentName: null,
          value: "18",
          defaultValue: "18",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.FormAlertFactor.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.FormAlertFactor.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.FormAlertFactor",
          parentName: null,
          value: "0",
          defaultValue: "0",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.IssuingFieldManagement.FormRefillFactor.Description",
          displayName:
            "CountryManagement.IssuingFieldManagement.FormRefillFactor.DisplayName",
          key: "CountryManagement.IssuingFieldManagement.FormRefillFactor",
          parentName: null,
          value: "0",
          defaultValue: "0",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "FreeTextStringValueType",
            properties: "{}",
            validator: {
              name: "NUMERIC",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
      ],
    },
    {
      isEnabled: true,
      key: "CountryManagement.Contracts",
      displayName: "CountryManagement.Contracts.DisplayName",
      description: null,
      items: [
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.Contracts.TRNMoveWithAllUnclaimedTags.Description",
          displayName:
            "CountryManagement.Contracts.TRNMoveWithAllUnclaimedTags.DisplayName",
          key: "CountryManagement.Contracts.TRNMoveWithAllUnclaimedTags",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "ToggleStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
      ],
    },
    {
      isEnabled: true,
      key: "CountryManagement.Services",
      displayName: "CountryManagement.Services.DisplayName",
      description: null,
      items: [
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName: "CountryManagement.Services.Exchange.DisplayName",
          key: "CountryManagement.Services.Exchange",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "ToggleStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName: "CountryManagement.Services.TourGuide.DisplayName",
          key: "CountryManagement.Services.TourGuide",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "ToggleStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description: null,
          displayName:
            "CountryManagement.Services.EligibilityService.DisplayName",
          key: "CountryManagement.Services.EligibilityService",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: [
            {
              isEnabled: true,
              isApplicable: null,
              isRequired: true,
              isActive: true,
              pattern: null,
              depth: 0,
              description:
                "CountryManagement.Services.EligibilityService.EligibilityCheckResultValidityHours.Description",
              displayName:
                "CountryManagement.Services.EligibilityService.EligibilityCheckResultValidityHours.DisplayName",
              key: "CountryManagement.Services.EligibilityService.EligibilityCheckResultValidityHours",
              parentName: null,
              value: "0",
              defaultValue: "0",
              bonds: [],
              subItems: null,
              valueType: {
                itemSource: {
                  items: [],
                },
                name: "FreeTextStringValueType",
                properties: "{}",
                validator: {
                  name: "NUMERIC",
                  properties: {
                    minValue: 0,
                    maxValue: 0,
                  },
                },
              },
            },
          ],
          valueType: {
            itemSource: {
              items: [],
            },
            name: "ToggleStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
        {
          isEnabled: true,
          isApplicable: null,
          isRequired: true,
          isActive: true,
          pattern: null,
          depth: 0,
          description:
            "CountryManagement.Services.AllowEligibilityComplaint.Description",
          displayName:
            "CountryManagement.Services.AllowEligibilityComplaint.DisplayName",
          key: "CountryManagement.Services.AllowEligibilityComplaint",
          parentName: null,
          value: "false",
          defaultValue: "false",
          bonds: [],
          subItems: null,
          valueType: {
            itemSource: {
              items: [],
            },
            name: "ToggleStringValueType",
            properties: "{}",
            validator: {
              name: "BOOLEAN",
              properties: {
                minValue: 0,
                maxValue: 0,
              },
            },
          },
        },
      ],
    },
  ],
};
