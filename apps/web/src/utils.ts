import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";
import { ZodSchema, ZodType, z } from "zod";
import { defaultResources } from "./resources";

type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export type ResourcesDto = LocalizationDto["resources"];

export function isServerSide() {
  return typeof window === "undefined";
}

export async function getLocalizationResources(languageCode: string): Promise<{
  [key: string]: {
    texts?:
      | {
          [key: string]: string;
        }
      | null
      | undefined;
    baseResources?: string[] | null | undefined;
  };
}> {
  try {
    const response = await fetch(
      `http://${process.env.HOSTNAME}:${process.env.PORT}/api/?lang=${languageCode}`
    );
    return ((await response.json()) as LocalizationDto).resources || {};
  } catch (error) {
    console.error("Offline Data");

    return defaultResources || {};
  }
}

function getLocale(locale?: string) {
  if (locale) return locale;

  if (isServerSide()) {
    const cookieStore = require("next/headers").cookies();
    locale = cookieStore.get("locale")?.value ?? "en";
  } else {
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split("/");
    locale = pathnameParts?.[1] ?? "en";
  }
  return locale;
}

export function getBaseLink(
  location: string,
  withLocale?: boolean,
  locale?: string
) {
  // check if location first character is a slash
  if (location.charAt(0) === "/") {
    location = location.slice(1);
  }
  const localePath = withLocale ? getLocale(locale) + "/" : "";
  return `/${localePath}${location}`;
}
//item & sub item
export type JsonSchema = {
  type:
    | "string"
    | "boolean"
    | "object"
    | "integer"
    | "number"
    | "array"
    | "toggle"
    | "select";
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  format?: "date-time" | "email" | "uuid";
  description?: string | undefined;
  nullable?: boolean;
  enum?: any;
  default?: any;
  properties?: Record<string, JsonSchema>;
  displayName: string;
};
//group
export type SchemaType = {
  required: ReadonlyArray<string>;
  type: String;
  displayName: string;
  properties: Record<string, JsonSchema | SchemaType>;
  additionalProperties: Boolean;
};

function isJsonSchema(object: any): object is JsonSchema {
  return "type" in object;
}
function isSchemaType(object: any): object is SchemaType {
  return object && "required" in object;
}

export function createZodObject(
  schema: SchemaType,
  positions: Array<any>,
  convertors?: Record<string, any>
): ZodType {
  const zodSchema: Record<string, ZodSchema> = {};
  positions.forEach((element: string) => {
    const props = schema.properties[element];
    const isRequired = schema.required?.includes(element);
    if (props && isSchemaType(props)) {
      Object.keys(props.properties).map((key) => {
        zodSchema[element] = createZodObject(
          props,
          Object.keys(props.properties)
        );
      });
    } else if (props && isJsonSchema(props)) {
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
            (e: any) => e[convertors[element].get]
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
function createZodType(
  schema: JsonSchema,
  isRequired: boolean
): ZodSchema<any> {
  let zodType;
  switch (schema?.type) {
    case "string":
      zodType = z.string({ description: schema.displayName });
      if (schema.maxLength) zodType = zodType.max(schema.maxLength);
      if (schema.pattern) zodType = zodType.regex(RegExp(schema.pattern));
      if (schema.format === "email") zodType = zodType.email();
      if (schema.default) zodType = zodType.default(schema.default);
      if (schema.format === "date-time") zodType = z.coerce.date();
      break;
    case "select":
      zodType = z.enum(schema.enum);
      if (schema.default) zodType = zodType.default(schema.default);
      break;
    case "boolean":
      zodType = z.boolean();
      if (schema.default) zodType = zodType.default(schema.default == "true");
      break;
    case "integer":
      if (schema.enum) {
        let stringEnums = schema.enum.map((e: any) => e.toString());
        zodType = z.enum(stringEnums as [string, ...string[]]);
        break;
      }
      zodType = z.number().int();
      break;
    case "integer":
      if (schema.enum) {
        let stringEnums = schema.enum.map((e: any) => e.toString());
        zodType = z.enum(stringEnums as [string, ...string[]]);
        break;
      }
      zodType = z.number().int();
      break;
    default:
      zodType = z.unknown({ description: schema.displayName });
  }
  if (!isRequired) zodType = zodType.optional();
  if (schema.nullable) zodType = zodType.nullable();
  return zodType;
}
