"use client";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import {
  Dependency,
  DependencyType,
  FieldConfig,
} from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/types";
import { ZodObjectOrWrapped } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/utils";
import { JsonSchema, SchemaType, createZodObject } from "src/utils";
import { countrySettingsResponse } from "./countryResponse";
import {
  AllowedValueTypeModelNameStringEnum,
  BondDto,
  GroupDto,
  GroupItemDto,
} from "./types";

// function test(item: GroupItemDto): any {
//   const x = {
//     type:
//       item.subItems && item.subItems.length > 0
//         ? "object"
//         : item.valueType.validator.name?.toLowerCase(),
//     required: item.isEnabled ? [item.key] : [],
//     key: item.key,
//     properties: Object.assign(
//       {},
//       ...item.subItems.map((subitem) => {
//         return {
//           [subitem.key]: test(subitem),
//         };
//       })
//     ),
//   };
//   return x;
// }
function isGroupDto(object: any): object is GroupDto {
  return "isEnabled" in object;
}

function createConfig(item: GroupItemDto) {
  let config = {
    [item.key]: {
      description: (
        <span className="text-muted-foreground">{item.description}</span>
      ),
      displayName: item.displayName,
    },
  };

  if (convertValueTypeNameToFieldType(item.valueType.name)) {
    Object.assign(config, {
      [item.key]: {
        fieldType: convertValueTypeNameToFieldType(item.valueType.name),
        displayName: item.displayName,
      },
    });
  }
  return config;
}
function subField(item: GroupItemDto) {
  if (item.subItems && item.subItems.length > 0) {
    let subitemconfigs = item.subItems.map((subitem) => {
      if (subitem.subItems && subitem.subItems.length > 0) {
        let subsubitemconfigs = subitem.subItems.map((subsubitem) => {
          return createConfig(subsubitem);
        });
        return {
          [subitem.key]: {
            ...Object.assign({}, ...Object.values(subsubitemconfigs)),
            displayName: subitem.displayName,
            description: subitem.description,
          },
        };
      }
      return createConfig(subitem);
    });
    let subs = {
      [item.key]: {
        ...Object.assign({}, ...Object.values(subitemconfigs)),
        displayName: item.displayName,
        description: item.description,
      },
    };
    return subs;
  }
}
function createFieldConfig(
  object: GroupDto
): FieldConfig<{ [x: string]: any }> {
  let configs = object.items.map((item) => {
    if (item.subItems && item.subItems.length > 0) {
      return subField(item);
    } else {
      return createConfig(item);
    }
  });
  let config = Object.assign({}, ...Object.values(configs));
  return config;
}

type createBondType = {
  bonds: BondDto[];
  targetField: string;
  parentField?: string;
};
type rtType = {
  sourceField: string;
  targetField: string;
  type: DependencyType;
  hasParentField: boolean;
  when: (val: any) => boolean;
};
function createBonds(sett: createBondType): rtType[] {
  return sett.bonds.map((bond) => {
    let sourceField = sett.parentField
      ? `${sett.parentField}.${bond.key}`
      : bond.key;

    let createdBond: rtType = {
      sourceField: sourceField,
      targetField: sett.targetField,
      type: DependencyType[bond.type],
      hasParentField: sett.parentField ? true : false,
      when: (val: any) => new RegExp(bond.pattern).test(val),
    };
    return createdBond;
  });
}
function createDependencies(
  group: GroupDto
): Dependency<{ [x: string]: any }>[] {
  let bonds = group.items.map((item) => {
    if (item.subItems && item.subItems.length > 0) {
      let subitembonds = item.subItems.map((subitem) => {
        return createBonds({
          bonds: subitem.bonds,
          targetField: subitem.key,
          parentField: item.key,
        });
      });
      let x = createBonds({
        bonds: item.bonds,
        targetField: item.key,
      });

      subitembonds.push(x);
      console.log(subitembonds);
      return subitembonds.filter((bond) => bond).flat();
    } else {
      if (item.bonds && item.bonds.length > 0) {
        return createBonds({
          bonds: item.bonds,
          targetField: item.key,
        });
      }
    }
  });
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
  type: AllowedValueTypeModelNameStringEnum
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

function CreateProperties(item: GroupItemDto): any {
  if (item.valueType.name == null)
    return { [item.key]: CreateSchema(undefined, item) };
  return {
    [item.key]: CreateJsonSchema(item),
  };
}
//Creates item & parent schema
function CreateSchema(group?: GroupDto, item?: GroupItemDto): SchemaType {
  var properties: any = {};
  if (group) {
    properties = Object.assign(
      {},
      ...group.items.map((item) => {
        return CreateProperties(item);
      })
    );
  } else if (item) {
    if (item.isApplicable && item.subItems && item.subItems.length > 0) {
      // console.log(item.displayName);
      //appliable ve child var
    }
    if (item.subItems && item.subItems.length > 0)
      properties = Object.assign(
        {},
        ...item.subItems.map((subitem) => {
          return CreateProperties(subitem);
        })
      );
  }
  return {
    displayName:
      (group ? group.displayName : item ? item.displayName : "") ?? "",
    required: [group ? group.key : item ? item.key : ""],
    type: "object",
    properties: properties,
    additionalProperties: false,
  };
}
//Creates item schema
function CreateJsonSchema(item: GroupItemDto): JsonSchema {
  let schema: JsonSchema = {
    type: convertValueTypeNameToSchemaType(item.valueType.name),
    isRequired: item.isRequired ?? false,
    isReadOnly: item.isActive ?? false,
    maxLength: item.valueType?.validator?.properties?.maxValue,
    default: item.defaultValue,
    description: item.description ?? "asdasdasdasd",
    displayName: item.displayName ?? "test",
  };
  if (item.valueType.name === "SelectionStringValueType") {
    schema = {
      ...schema,
      enum: item.valueType?.itemSource?.items?.map((x) => x.value),
    };
  }
  return schema;
}

export default async function Page({ params }: { params: { group: string } }) {
  const { group } = params;
  const activeGroup =
    countrySettingsResponse.groups.find(
      (_group: GroupDto) => _group.key === group
    ) ?? countrySettingsResponse.groups[0];

  let schema = CreateSchema(activeGroup);
  const formSchema = createZodObject(
    schema,
    activeGroup.items.map((x) => x.key)
  ) as ZodObjectOrWrapped;
  const fieldConfig = createFieldConfig(activeGroup);
  const dependencies = createDependencies(activeGroup);
  console.log(dependencies);
  return (
    <div className="p-8">
      <SectionLayout
        sections={Object.keys(countrySettingsResponse.groups).map(
          (key: any) => ({
            id: countrySettingsResponse.groups[key].key,
            name: countrySettingsResponse.groups[key].displayName,
          })
        )}
        defaultActiveSectionId={group}
        openOnNewPage={true}
        vertical={true}
        className="items-start p-0 "
        content={
          <div className="flex flex-col gap-4 min-w-3xl max-w-3xl w-full mt-8">
            <AutoForm
              className="w-full"
              formSchema={formSchema}
              onParsedValuesChange={(e) => {
                console.log(e);
              }}
              onSubmit={(e) => {
                console.log(e);
              }}
              fieldConfig={fieldConfig}
              dependencies={dependencies}
            >
              <AutoFormSubmit className="float-right" />
            </AutoForm>
          </div>
        }
        contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center"
      />
    </div>
  );
}
