export const $createMerchants = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    // ituCountryCode: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // areaCode: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    telephoneTypeCode: {
      type: "integer",
      enum: [0, 1, 2, 3],
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressTypeCode: {
      type: "integer",
      enum: [0, 1],
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailTypeCode: {
      type: "integer",
      enum: [0, 1],
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
  },
} as const;

export const $showMerchants = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    areaCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    telephoneTypeCode: {
      type: "integer",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    addressTypeCode: {
      type: "integer",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
    emailTypeCode: {
      type: "integer",
    },
    productName: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    vatRate: {
      type: "integer",
    },
    productCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    isActive: {
      type: "boolean",
    },
  },
} as const;

export const $editMerchants = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    areaCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    telephoneTypeCode: {
      type: "integer",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    addressTypeCode: {
      type: "integer",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
    emailTypeCode: {
      type: "integer",
    },
    productName: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    vatRate: {
      type: "integer",
    },
    productCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    isActive: {
      type: "boolean",
    },
  },
} as const;

export const $createrefundPoints = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    areaCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    telephoneTypeCode: {
      type: "integer",
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },

    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressTypeCode: {
      type: "integer",
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailTypeCode: {
      type: "integer",
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
  },
} as const;

export const $editRerefundPoints = {
  required: ["name"],
  type: "object",
  properties: {
    Company: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    CustomerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ProductGroups: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    Address: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
  },
} as const;

export const $showRerefundPoints = {
  required: ["name"],
  type: "object",
  properties: {
    Company: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    CustomerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ProductGroups: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    Address: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
  },
} as const;

export const $createCustoms = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    areaCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    telephoneTypeCode: {
      type: "integer",
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },

    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressTypeCode: {
      type: "integer",
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailTypeCode: {
      type: "integer",
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
  },
} as const;

export const $editCustoms = {
  required: ["name"],
  type: "object",
  properties: {
    Company: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    CustomerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ProductGroups: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    Address: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
  },
} as const;

export const $showCustoms = {
  required: ["name"],
  type: "object",
  properties: {
    Company: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    CustomerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ProductGroups: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    Address: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
  },
} as const;

export const $createtaxFree = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    areaCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    telephoneTypeCode: {
      type: "integer",
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },

    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressTypeCode: {
      type: "integer",
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailTypeCode: {
      type: "integer",
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
  },
} as const;

export const $edittaxFree = {
  required: ["name"],
  type: "object",
  properties: {
    Company: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    CustomerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ProductGroups: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    Address: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
  },
} as const;

export const $showtaxFree = {
  required: ["name"],
  type: "object",
  properties: {
    Company: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    CustomerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ProductGroups: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    Address: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
  },
} as const;

export const $createtaxOffices = {
  type: "object",
  properties: {
    name: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    taxpayerId: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    legalStatusCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    customerNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    areaCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    telephoneTypeCode: {
      type: "integer",
    },
    localNumber: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    addressLine: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },

    terriority: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    addressTypeCode: {
      type: "integer",
    },
    addressPrimaryFlag: {
      type: "boolean",
    },
    emailAddress: {
      maxLength: 64,
      minLength: 0,
      type: "string",
    },
    emailTypeCode: {
      type: "integer",
    },
    emailPrimaryFlag: {
      type: "boolean",
    },
  },
} as const;
