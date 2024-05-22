import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from "@ayasofyazilim/saas/AccountService";
import { ZodSchema, z } from "zod";

type LocalizationDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
export type ResourcesDto = LocalizationDto["resources"];

export function isServerSide() {
  return typeof window === "undefined";
}

export async function getLocalizationResources(languageCode: string) {
  const response = await fetch(
    getBaseLink(`/api/?lang=${languageCode}`, false)
  );
  return ((await response.json()) as LocalizationDto).resources;
}

function getLocale(locale?: string) {
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
  const origin = isServerSide()
    ? `${process.env.HOSTNAME}:${process.env.PORT}`
    : window.location.origin;
  const localePath = withLocale ? getLocale(locale) + "/" : "";
  return `${origin}/${localePath}${location}`;
}

type JsonSchema = {
  type: "string" | "boolean" | "object";
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  format?: "date-time";
};

type SchemaType = {
  required: ReadonlyArray<string>;
  type: String;
  properties: Record<string, JsonSchema>;
  additionalProperties: Boolean;
};

export function createZodObject(
  schema: SchemaType,
  positions: Array<any>
): ZodSchema<any> {
  const zodSchema: Record<string, ZodSchema> = {};
  positions.forEach((element: string) => {
    const props = schema.properties[element];
    const isRequired = schema.required.includes(element);
    let zodType = createZodType(props, isRequired);
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
  isRequired: boolean
): ZodSchema<any> {
  let zodType;
  switch (schema.type) {
    case "string":
      zodType = z.string();
      if (schema.maxLength) zodType = zodType.max(schema.maxLength);
      if (schema.pattern) zodType = zodType.regex(schema.pattern);
      break;
    case "boolean":
      zodType = z.boolean();
      break;
    default:
      zodType = z.unknown();
  }
  if (!isRequired) zodType = zodType.optional();
  return zodType;
}
