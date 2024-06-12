"use client";
import {
  UniRefund_SettingService_Bonds_BondDto,
  UniRefund_SettingService_CountrySettings_CountrySettingDto,
  UniRefund_SettingService_Groups_GroupDto,
  UniRefund_SettingService_Items_GroupItemDto,
} from "@ayasofyazilim/saas/SettingService";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import {
  JsonSchema,
  SchemaType,
  createZodObject,
} from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
  AutoFormTypes,
  AutoFormUtils,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { useEffect, useState } from "react";

export type AllowedValueTypeModelNameStringEnum =
  | "ToggleStringValueType"
  | "FreeTextStringValueType"
  | "SelectionStringValueType"
  | "BooleanValueType"
  | "NumericValueType"
  | ""
  | null;

export function isGroupDto(
  object: any
): object is UniRefund_SettingService_Groups_GroupDto {
  return "isEnabled" in object;
}

function createConfig(
  item: UniRefund_SettingService_Items_GroupItemDto,
  resources: any
) {
  let config = {
    [item.key]: {
      description: description(
        resources?.SettingService?.texts?.[item.description] ?? item.description
      ),
      displayName:
        resources?.SettingService?.texts?.[item.displayName] ??
        item.displayName,
    },
  };

  if (
    item?.valueType?.name &&
    convertValueTypeNameToFieldType(
      item.valueType.name as AllowedValueTypeModelNameStringEnum
    )
  ) {
    Object.assign(config, {
      [item.key]: {
        fieldType: convertValueTypeNameToFieldType(
          item.valueType.name as AllowedValueTypeModelNameStringEnum
        ),
        displayName:
          resources?.SettingService?.texts?.[item.displayName] ??
          item.displayName,
      },
    });
  }
  return config;
}
function subField(
  item: UniRefund_SettingService_Items_GroupItemDto,
  resources: any
) {
  if (item.subItems && item.subItems.length > 0) {
    let subitemconfigs = item.subItems.map(
      (subitem: UniRefund_SettingService_Items_GroupItemDto) => {
        if (subitem.subItems && subitem.subItems.length > 0) {
          let subsubitemconfigs = subitem.subItems.map(
            (subsubitem: UniRefund_SettingService_Items_GroupItemDto) => {
              return createConfig(subsubitem, resources);
            }
          );
          return {
            [subitem.key]: {
              ...Object.assign({}, ...Object.values(subsubitemconfigs)),
              displayName:
                resources?.SettingService?.texts?.[subitem.displayName] ??
                subitem.displayName,
              description: description(
                resources?.SettingService?.texts?.[subitem.description] ??
                  subitem.description
              ),
            },
          };
        }
        return createConfig(subitem, resources);
      }
    );
    let subs = {
      [item.key]: {
        ...Object.assign({}, ...Object.values(subitemconfigs)),
        displayName:
          resources?.SettingService?.texts?.[item.displayName] ??
          item.displayName,
        description: description(
          resources?.SettingService?.texts?.[item.description] ??
            item.description
        ),
      },
    };
    return subs;
  } else {
    return createConfig(item, resources);
  }
}
function createFieldConfig(
  object: UniRefund_SettingService_Groups_GroupDto,
  resources: any
): AutoFormTypes.FieldConfig<{ [x: string]: any }> {
  let configs = object.items.map(
    (item: UniRefund_SettingService_Items_GroupItemDto) => {
      if (item.subItems && item.subItems.length > 0) {
        return subField(item, resources);
      } else {
        return createConfig(item, resources);
      }
    }
  );
  let config = Object.assign({}, ...Object.values(configs));
  return config;
}

type createBondType = {
  bonds: UniRefund_SettingService_Bonds_BondDto[];
  targetField: string;
  parentField?: string;
};
type bondType = {
  sourceField: string;
  targetField: string;
  type: AutoFormTypes.DependencyType;
  hasParentField: boolean;
  when: (val: any) => boolean;
};

function createSafeRegexp(val: any, pattern: string | undefined | null) {
  let x = val;
  try {
    x = new RegExp(pattern || "").test(val);
  } catch (error) {
    x = "";
  } finally {
    return x;
  }
}
function createBonds(sett: createBondType): bondType[] {
  return sett.bonds.map((bond) => {
    let sourceField = sett.parentField
      ? `${sett.parentField}.${bond.key}`
      : bond.key;

    let createdBond: bondType = {
      sourceField: sourceField ?? "", //bond.key is not nullable fix it
      targetField: sett.targetField,
      type: bond.type,
      hasParentField: sett.parentField ? true : false,
      when: (val: any) => createSafeRegexp(val, bond.pattern),
    };
    return createdBond;
  });
}
function createDependencies(
  group: UniRefund_SettingService_Groups_GroupDto
): AutoFormTypes.Dependency<{ [x: string]: any }>[] {
  let bonds = group.items.map(
    (item: UniRefund_SettingService_Items_GroupItemDto) => {
      if (item.subItems && item.subItems.length > 0) {
        let subitembonds = item.subItems.map(
          (subitem: UniRefund_SettingService_Items_GroupItemDto) => {
            return createBonds({
              bonds: subitem.bonds,
              targetField: subitem.key,
              parentField: item.key,
            });
          }
        );
        let x = createBonds({
          bonds: item.bonds,
          targetField: item.key,
        });
        subitembonds.push(x);
        return subitembonds.filter((bond: bondType) => bond).flat();
      } else {
        if (item.bonds && item.bonds.length > 0) {
          return createBonds({
            bonds: item.bonds,
            targetField: item.key,
          });
        }
      }
    }
  );
  // @ts-ignore
  return bonds.filter((x) => x).flat();
}
function convertValueTypeNameToFieldType(
  type: AllowedValueTypeModelNameStringEnum
) {
  switch (type) {
    case "ToggleStringValueType":
      return "switch";
    case "FreeTextStringValueType":
    case "SelectionStringValueType":
    default:
      return undefined;
  }
}
function convertValueTypeNameToSchemaType(
  type: AllowedValueTypeModelNameStringEnum | undefined
) {
  switch (type) {
    case "ToggleStringValueType":
      return "boolean";
    case "FreeTextStringValueType":
      return "string";
    case "SelectionStringValueType":
      return "select";
    case "BooleanValueType":
      return "boolean";
    default:
      return "string";
  }
}
function createProperties(
  item: UniRefund_SettingService_Items_GroupItemDto
): any {
  if (!item.valueType) return;
  if (item.subItems && item.subItems.length > 0)
    return { [item.key]: createSchema(undefined, item) };
  return {
    [item.key]: createJsonSchema(item),
  };
}
//Creates item & parent schema
function createSchema(
  group?: UniRefund_SettingService_Groups_GroupDto,
  item?: UniRefund_SettingService_Items_GroupItemDto
): SchemaType {
  var properties: any = {};
  if (group) {
    properties = Object.assign(
      {},
      ...group.items.map(
        (item: UniRefund_SettingService_Items_GroupItemDto) => {
          return createProperties(item);
        }
      )
    );
  } else if (item) {
    if (item.isApplicable && item.subItems && item.subItems.length > 0) {
      //appliable ve child var
    }
    if (item.subItems && item.subItems.length > 0)
      properties = Object.assign(
        {},
        ...item.subItems.map(
          (subitem: UniRefund_SettingService_Items_GroupItemDto) => {
            return createProperties(subitem);
          }
        )
      );
  }
  return {
    displayName: "asd",
    required: [group ? group.key : item ? item.key : ""],
    type: "object",
    properties: properties,
    additionalProperties: false,
  };
}
//Creates item schema
function createJsonSchema(
  item: UniRefund_SettingService_Items_GroupItemDto
): JsonSchema {
  let schema: JsonSchema = {
    type: convertValueTypeNameToSchemaType(
      item.valueType?.name as AllowedValueTypeModelNameStringEnum
    ),
    isRequired: item.isRequired ?? false,
    isReadOnly: item.isActive ?? false,
    maxLength: item.valueType?.validator?.properties?.maxValue,
    // default: item.defaultValue,
    // description: item.description ?? "asdasdasdasd",
    displayName: item.displayName ?? item.key,
  };
  if (item.valueType && item.valueType.name === "SelectionStringValueType") {
    schema = {
      ...schema,
      enum: item.valueType?.itemSource?.items?.map((x: any) => x.value),
    };
  }
  return schema;
}

function Content(
  fieldConfig: AutoFormTypes.FieldConfig<{ [x: string]: any }>,
  formSchema: any,
  dependencies: AutoFormTypes.Dependency<{ [x: string]: any }>[]
) {
  return (
    <div className="flex flex-col gap-4 min-w-3xl mx-auto max-w-3xl w-full px-4 py-8">
      <AutoForm
        className="w-full"
        formSchema={formSchema}
        onParsedValuesChange={(e) => {}}
        onSubmit={(e) => {}}
        fieldConfig={fieldConfig}
        dependencies={dependencies}
      >
        <AutoFormSubmit className="float-right" />
      </AutoForm>
    </div>
  );
}

function description(text: string) {
  if (!text) return text;
  if (text.length < 100)
    return <div className="text-sm text-muted-foreground">{text}</div>;
  return (
    <Tooltip>
      <TooltipTrigger className="text-muted-foreground">
        {text.substring(0, 100) + "..."}
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}

export function SettingsView({
  list,
  resources,
  path,
}: {
  path: string;
  list: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  resources?: any;
}) {
  const [activeGroup, setActiveGroup] =
    useState<UniRefund_SettingService_Groups_GroupDto>(() => {
      const test = list.groups.find(
        (item: UniRefund_SettingService_Items_GroupItemDto) => item.key === path
      );
      if (test) return test;
      return list.groups[0];
    });

  const [content, setContent] = useState<React.ReactElement>(() => {
    const group = activeGroup || list.groups[0];
    let schema = createSchema(group);
    const formSchema = createZodObject(
      schema,
      group.items.map(
        (item: UniRefund_SettingService_Items_GroupItemDto) => item.key
      )
    ) as AutoFormUtils.ZodObjectOrWrapped;
    const fieldConfig = createFieldConfig(group, resources);
    const dependencies = createDependencies(group);
    return Content(fieldConfig, formSchema, dependencies);
  });
  useEffect(() => {
    window.history.pushState(
      null,
      "",
      window.location.href.replace("home", list.groups[0].key)
    );
  }, []);

  function onSectionChange(sectionId: string) {
    // console.log(sectionId); //sholdnt be called twice
    if (sectionId === activeGroup.key) return;
    const group =
      list.groups.find(
        (s: UniRefund_SettingService_Groups_GroupDto) => s.key === sectionId
      ) || list.groups[0];
    let schema = createSchema(group);
    const formSchema = createZodObject(
      schema,
      group.items.map(
        (item: UniRefund_SettingService_Items_GroupItemDto) => item.key
      )
    ) as AutoFormUtils.ZodObjectOrWrapped;
    const fieldConfig = createFieldConfig(group, resources);
    const dependencies = createDependencies(group);

    setContent(Content(fieldConfig, formSchema, dependencies));

    window.history.pushState(
      null,
      "",
      window.location.href.replace(activeGroup.key, sectionId)
    );
    setActiveGroup(group);
  }
  return (
    <SectionLayout
      sections={list.groups.map((group: any, index: any) => {
        return {
          id: group.key,
          name:
            resources?.SettingService?.texts[group.displayName] ??
            group.displayName,
        };
      })}
      defaultActiveSectionId={activeGroup?.key || list.groups[0].key}
      openOnNewPage={false}
      showContentInSamePage={true}
      onSectionChange={onSectionChange}
      vertical={true}
      className=""
      content={content}
      contentClassName="flex flex-col"
    />
  );
}
