import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";
import { ZodSchema, ZodType, z } from "zod";

type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export type ResourcesDto = LocalizationDto["resources"];

export function isServerSide() {
  return typeof window === "undefined";
}

export async function getLocalizationResources(languageCode: string) {
  const response = await fetch(
    `http://${process.env.HOSTNAME}:${process.env.PORT}/api/?lang=${languageCode}`
  );
  return ((await response.json()) as LocalizationDto).resources;
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

type JsonSchema = {
  type: "string" | "boolean" | "object" | "integer" | "number" | "array";
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  format?: "date-time" | "email" | "uuid" ;
  nullable?: boolean;
  enum?: ReadonlyArray<string | number>;
};

type SchemaType = {
  required: ReadonlyArray<string>;
  type: String;
  properties: Record<string, JsonSchema>;
  additionalProperties: Boolean;
};

export function createZodObject(
  schema: SchemaType,
  positions: Array<any>,
  convertors?: Record<string, any>
): ZodType {
  const zodSchema: Record<string, ZodSchema> = {};
  positions.forEach((element: string) => {
    const props = schema.properties[element];
    const isRequired = schema.required.includes(element);
    let zodType;
    if (convertors && Object.keys(convertors).includes(element)) {
      const newProps = props;
      newProps.enum = convertors[element];
      zodType = createZodType(newProps, isRequired);
    } else {
      zodType = createZodType(props, isRequired);
    }
    zodSchema[element] = zodType;
  });
  return z.object(zodSchema);
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
  isRequired: boolean,
): ZodSchema<any> {
  let zodType;
  switch (schema.type) {
    case "string":
      zodType = z.string();
      if (schema.maxLength) zodType = zodType.max(schema.maxLength);
      if (schema.pattern) zodType = zodType.regex(schema.pattern);
      if (schema.format === "email") zodType = zodType.email();
      if (schema.format === "date-time") zodType = z.date();
      break;
    case "boolean":
      zodType = z.boolean();
      break;
    case "integer":
      if(schema.enum) {
        let stringEnums = schema.enum.map((e) => e.toString());
        zodType = z.enum(stringEnums as [string, ...string[]]);
        break;
      }
      zodType = z.number().int();
      break;
    default:
      zodType = z.unknown();
  }
  if (!isRequired) zodType = zodType.optional();
  if (schema.nullable) zodType = zodType.nullable();
  return zodType;
}
