import { $UniRefund_CRMService_Organizations_UpdateOrganizationDto } from "@ayasofyazilim/saas/CRMService";

export const organization =
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
export const telephone = {
  required: ["areaCode", "ituCountryCode", "localNumber", "typeCode"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    areaCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    localNumber: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Home", "Office", "Mobile", "Fax"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
export const address = {
  required: [
    "addressLine",
    "city",
    "country",
    "fullAddress",
    "postalCode",
    "terriority",
    "typeCode",
  ],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    addressLine: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    terriority: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Home", "Office"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
export const email = {
  required: ["emailAddress", "typeCode"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    emailAddress: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Work", "Personal"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
export const individualSchema = {
  type: "object",
  required: ["name", "surname", "jobTitle", "email", "telephone", "active"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    surname: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    jobTitle: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    email: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    telephone: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    active: {
      type: "boolean",
    },
  },
};
export const individualData = [
  {
    id: "1",
    name: "Alice",
    surname: "Brown",
    jobTitle: "Store Manager",
    email: "alice.brown@techfreestore.com",
    telephone: "+905374924745",
    active: false,
  },
  {
    id: "2",
    name: "Bob",
    surname: "Green",
    jobTitle: "Sales Associate",
    email: "bob.green@techfreestore.com",
    telephone: "+905499573638",
    active: true,
  },
  {
    id: "3",
    name: "Charlie",
    surname: "Black",
    jobTitle: "Inventory Specialist",
    email: "charlie.black@techfreestore.com",
    telephone: "+905335739738",
    active: true,
  },
  {
    id: "4",
    name: "Diana",
    surname: "White",
    jobTitle: "Customer Service Representative",
    email: "diana.white@techfreestore.com",
    telephone: "+905316638492",
    active: false,
  },
  {
    id: "5",
    name: "Eve",
    surname: "Red",
    jobTitle: "Cashier",
    email: "eve.red@techfreestore.com",
    telephone: "+905394484774",
    active: true,
  },
];
