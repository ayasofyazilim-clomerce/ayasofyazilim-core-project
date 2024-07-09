import type { ZodObjectOrWrapped } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/utils";
import { z } from "zod";
import { createZodObject } from "src/utils";

const $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto = {
  type: "object",
  required: [
    "companyName",
    "taxpayerId",
    "legalStatusCode",
    "customerNumber",
    "emailAddress",
    "telephone",
  ],
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    companyName: {
      type: "string",
    },
    taxpayerId: {
      type: "string",
    },
    legalStatusCode: {
      type: "string",
    },
    customerNumber: {
      type: "string",
    },
    emailAddress: {
      type: "string",
      format: "email",
    },
    telephone: {
      type: "object",
      properties: {
        extraProperties: {
          type: "object",
          additionalProperties: {},
          nullable: true,
          readOnly: true,
        },
        areaCode: {
          type: "string",
        },
        localNumber: {
          type: "string",
        },
        ituCountryCode: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
    address: {
      type: "object",
      properties: {
        extraProperties: {
          type: "object",
          additionalProperties: {},
          nullable: true,
          readOnly: true,
        },
        typeCode: {
          enum: [0, 1],
          type: "integer",
          format: "int32",
        },
        addressLine: {
          type: "string",
        },
        city: {
          type: "string",
        },
        terriority: {
          type: "string",
        },
        postalCode: {
          type: "string",
        },
        country: {
          type: "string",
        },
        fullAddress: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
} as const;

const $UpwithCrowd_BackerService_Individuals_CreateIndividualDto = {
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    name: {
      type: "string",
      additionalProperties: false,
    },
    emailAddress: {
      type: "string",
      format: "email",
    },
    telephone: {
      type: "object",
      properties: {
        extraProperties: {
          type: "object",
          additionalProperties: {},
          nullable: true,
          readOnly: true,
        },
        areaCode: {
          type: "string",
          nullable: true,
        },
        localNumber: {
          type: "string",
          nullable: true,
        },
        ituCountryCode: {
          type: "string",
          nullable: true,
        },
      },
    },
    address: {
      type: "object",
      properties: {
        extraProperties: {
          type: "object",
          additionalProperties: {},
          nullable: true,
          readOnly: true,
        },
        typeCode: {
          enum: [0, 1],
          type: "integer",
          format: "int32",
        },
        addressLine: {
          type: "string",
          nullable: true,
        },
        city: {
          type: "string",
          nullable: true,
        },
        terriority: {
          type: "string",
          nullable: true,
        },
        postalCode: {
          type: "string",
          nullable: true,
        },
        country: {
          type: "string",
          nullable: true,
        },
        fullAddress: {
          type: "string",
          nullable: true,
        },
      },
    },
  },
  additionalProperties: false,
} as const;

const createBacker =
  $UpwithCrowd_BackerService_Organizations_CreateOrganizationDto;
const createIndividual =
  $UpwithCrowd_BackerService_Individuals_CreateIndividualDto;
const backerZod = createZodObject(
  createBacker,
  Object.keys(createBacker.properties),
);
const IndividualZod = createZodObject(
  createIndividual,
  Object.keys(createIndividual.properties),
);
export const formSchema: Record<string, ZodObjectOrWrapped> = {
  admin: backerZod,
  user: z.object({
    name: z.string(),
    surname: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    email: z.string().email(),
  }),
  entrepreneur: IndividualZod,
  investor: backerZod,
  individual: IndividualZod,
  organization: backerZod,
};
