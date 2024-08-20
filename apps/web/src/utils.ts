/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";
import type { ZodObjectOrWrapped } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/utils";
import type { ZodSchema } from "zod";
import { z } from "zod";
import type { MenuAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import type { AutoFormProps } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { defaultResources } from "./resources";

type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export type ResourcesDto = LocalizationDto["resources"];

export function isServerSide() {
  return typeof window === "undefined";
}

export type ResourceResult = Record<
  string,
  | {
      texts?: Record<string, string> | null | undefined;
      baseResources?: string[] | null | undefined;
    }
  | undefined
>;

export async function getLocalizationResources(
  languageCode: string,
): Promise<ResourceResult> {
  try {
    const response = await fetch(
      `http://${process.env.HOSTNAME}:${process.env.PORT}/api/?lang=${languageCode}`,
    );
    return ((await response.json()) as LocalizationDto).resources || {};
  } catch (error) {
    return defaultResources || {};
  }
}

function getLocale(locale?: string): string {
  if (locale) return locale;
  // FIXME: This is a temporary solution for eslint
  if (isServerSide()) {
    //   return localeServerSide();
    return "tr";
  }
  const pathname = window.location.pathname;
  const pathnameParts = pathname.split("/");
  return pathnameParts[1] ?? "tr";
}
function getAppType(appType?: string) {
  if (appType === "public") return `${appType}/`;

  if (appType) {
    return `app/${appType}/`;
  }

  if (!isServerSide()) {
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split("/");
    return `app/${pathnameParts[3]}/`;
  }
  return "public/";
}
export function getBaseLink(
  location: string,
  withLocale?: boolean,
  locale?: string,
  withAppType?: boolean,
  appType?: string,
) {
  // check if location first character is a slash
  let newLocation = location;
  if (location.startsWith("/")) {
    newLocation = location.slice(1);
  }
  let localePath = withLocale ? `${getLocale(locale)}/` : "";
  if (withAppType) {
    localePath += getAppType(appType);
  }

  return `/${localePath}${newLocation}`;
}
//item & sub item
export interface JsonSchema {
  type:
    | "string"
    | "boolean"
    | "object"
    | "integer"
    | "number"
    | "array"
    | "toggle"
    | "select"
    | "phone";
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  refine?: { params?: object; callback: (_value: any) => boolean };
  format?: "date-time" | "email" | "uuid";
  description?: string | undefined;
  nullable?: boolean;
  enum?: any;
  default?: any;
  properties?: Record<string, JsonSchema>;
  displayName: string;
  items?: SchemaType;
  additionalProperties?: boolean;
}
//group
export interface SchemaType {
  required?: readonly string[];
  type: string;
  displayName?: string;
  properties?: Record<string, JsonSchema | SchemaType>;
  additionalProperties?: boolean;
  items?: SchemaType;
}

export interface FormModifier {
  actionList?: (controlledFetch: unknown, getRoles: unknown) => MenuAction[];
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
  convertors?: Record<string, any>;
  dependencies?: AutoFormProps["dependencies"];
}

export interface TableData {
  createFormSchema?: FormModifier;
  editFormSchema?: FormModifier;
  tableSchema: FormModifier;
  title?: string;
}

function isJsonSchema(object: any): object is JsonSchema {
  if (!object) return false;
  return "type" in object;
}
function isSchemaType(object: any): object is SchemaType {
  return object && "required" in object;
}

export function generateNavigationItems(
  dataConfig: Record<string, any>,
  arrayOfKeys: string[],
  languageData: Record<string, string>,
  baseType: string,
  baseRoute: string,
  paramsLang: string,
  icon: JSX.Element,
) {
  return Object.entries(dataConfig)
    .filter((i) => arrayOfKeys.includes(i[0]))
    .map(([key, value]) => ({
      key,
      title:
        languageData[
          value.displayName.replaceAll(" ", "") as keyof typeof languageData
        ] || value.displayName,
      href: getBaseLink(
        `app/${baseType}/${baseRoute}/${key}/${value.default}`,
        true,
        paramsLang,
      ),
      type: "admin",
      appType: "",
      icon,
    }));
}

// schema: SchemaType
export function createZodObject(
  schema: any,
  positions?: string[],
  convertors?: Record<string, any>,
): ZodObjectOrWrapped {
  const zodSchema: Record<string, ZodSchema> = {};
  const tempPositions = positions ? positions : Object.keys(schema.properties);
  tempPositions.forEach((element: string) => {
    if (element === "extraProperties") return;
    const props = schema?.properties?.[element];
    const isRequired = schema.required?.includes(element) || false;
    if (isSchemaType(props)) {
      Object.keys(props.properties || {}).forEach(() => {
        zodSchema[element] = createZodObject(
          props,
          Object.keys(props.properties || {}),
        );
      });
    } else if (isJsonSchema(props)) {
      let zodType;
      if (convertors && Object.keys(convertors).includes(element)) {
        const newProps = props;
        newProps.enum = convertors[element].data;
        if (convertors[element].type === "enum") {
          newProps.enum = convertors[element].data;
        }
        if (convertors[element].type === "static") {
          newProps.type = "select";
          newProps.enum = convertors[element].data;
        }
        if (
          convertors[element].type === "async" &&
          typeof convertors[element].data !== "function"
        ) {
          newProps.type = "select";
          newProps.enum = convertors[element].data.map(
            (e: any) => e[convertors[element].get],
          );
        }
        zodType = createZodType(newProps, isRequired);
      } else {
        zodType = createZodType(props, isRequired);
      }
      zodSchema[element] = zodType;
    }
  });
  return z.object(zodSchema, {
    description: schema.displayName,
  });
}

// TODO: Handle object case and add related data and example is
// $Volo_Abp_Identity_IdentityRoleCreateDto
// const formSchema = z.object({
//     name: z.string().max(256).min(0), // Assuming `name` is optional as it's not in the required list
//     isDefault: z.boolean().optional(),
//     isPublic: z.boolean().optional(),
//     extraProperties: z.object({
//         // Assuming any additional properties are of type `unknown`
//         additionalProperties: z.unknown().optional(),
//         nullable: z.boolean().optional(),
//         readOnly: z.boolean().optional()
//     }).optional().nullable()
// })
function createZodType(schema: JsonSchema, isRequired: boolean): ZodSchema {
  let zodType;
  switch (schema.type) {
    case "string":
      zodType = z.string({ description: schema.displayName });
      if (schema.format === "email") zodType = zodType.email();
      if (schema.maxLength) zodType = zodType.max(schema.maxLength);
      if (schema.minLength) zodType = zodType.min(schema.minLength);
      if (schema.pattern) zodType = zodType.regex(RegExp(schema.pattern));
      if (schema.refine)
        zodType = zodType.refine(schema.refine.callback, schema.refine.params);
      if (schema.default) zodType = zodType.default(schema.default);
      if (schema.format === "date-time") zodType = z.coerce.date();
      break;
    case "select":
      zodType = z.enum(schema.enum);
      if (schema.default) zodType = zodType.default(schema.default);
      break;
    case "boolean":
      zodType = z.boolean();
      if (schema.default) zodType = zodType.default(schema.default === "true");
      break;
    case "integer":
    case "number":
      if (schema.enum) {
        const stringEnums = schema.enum.map((e: any) => e.toString());
        zodType = z.enum(stringEnums as [string, ...string[]]);
        break;
      }
      zodType = z.coerce.number();
      break;
    case "object":
      zodType = z.object({});
      if (schema.properties) {
        zodType = createZodObject(
          schema as SchemaType,
          Object.keys(schema.properties),
        );
      }
      break;

    case "array":
      if (schema.items?.properties) {
        zodType = z.array(
          createZodObject(schema.items, Object.keys(schema.items.properties)),
        );
      } else {
        zodType = z.array(z.unknown());
      }
      break;
    default:
      zodType = z.unknown({ description: schema.displayName });
  }
  if (!isRequired) zodType = zodType.optional();
  if (schema.nullable) zodType = zodType.nullable();
  return zodType;
}
