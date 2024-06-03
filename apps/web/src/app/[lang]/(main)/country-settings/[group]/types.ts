export interface SettingModelDto {
  isEnabled: boolean;
  isRequired: boolean | null;
  isActive: boolean | null;
  pattern: string | null;
  depth: number;
  description: string | null;
  displayName: string | null;
  name: string;
  parentName: string | null;
  value: string;
  defaultValue: string | null;
  valueType: ValueTypeModelDto;
}
export type actionType = {
  autoFormArgs: any;
  callback: (values: any, triggerData: any) => void;
  cta: string;
  description: string;
};

export interface GroupItemDto {
  isEnabled: boolean;
  isApplicable: boolean | null;
  isRequired: boolean | null;
  isActive: boolean | null;
  pattern: string | null;
  depth: number;
  description: string | null;
  displayName: string | null;
  key: string;
  parentName: string | null;
  value: string | null;
  defaultValue: string | boolean | null;
  bonds: BondDto[];
  subItems: GroupItemDto[] | null;
  valueType: ValueTypeModelDto;
}
export interface GroupDto {
  isEnabled: boolean;
  key: string;
  displayName: string;
  description: string | null;
  items: GroupItemDto[];
}

export interface ValueTypeModelDto {
  itemSource: ItemSourceDto | null;
  name: AllowedValueTypeModelNameStringEnum;
  properties: string | null;
  validator: ValidatorDto;
}

export interface ItemSourceDto {
  items: ItemDto[];
}
export interface ItemDto {
  displayText: DisplayTextDto;
  value: string;
}
export interface DisplayTextDto {
  name: string;
  resourceName: string;
}
export interface ValidatorDto {
  name: "BOOLEAN" | "NUMERIC" | "STRING" | "NONE" | "NULL" | null | "";
  properties: ValidatorPropertiesDto;
}
export interface ValidatorPropertiesDto {
  minValue: number;
  maxValue: number;
}
export interface CountrySettingDto {
  isEnabled: boolean;
  groups: GroupDto[];
}

export interface BondDto {
  key: string;
  pattern: string;
  type: "DISABLES" | "REQUIRES" | "HIDES" | "SETS_OPTIONS";
}

export type AllowedValueTypeModelNameStringEnum =
  | "ToggleStringValueType"
  | "FreeTextStringValueType"
  | "SelectionStringValueType"
  | "BooleanValueType"
  | "NumericValueType"
  | ""
  | null;

export enum BooleanValueStringEnum {
  True,
  False,
}

export enum ValidatorNameStringEnum {
  Boolean,
  Numeric,
  String,
  None,
}
