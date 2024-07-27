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
    // areaCode: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // localNumber: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // ituCountryCode: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // primaryFlag: {
    //   type: "boolean",
    // },
    // telephoneTypeCode: {
    //   type: "integer",
    // },
    // addressLine: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // city: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // terriority: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // postalCode: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // country: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // fullAddress: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // addressPrimaryFlag: {
    //   type: "boolean",
    // },
    // addressTypeCode: {
    //   type: "integer",
    // },
    // emailAddress: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // emailPrimaryFlag: {
    //   type: "boolean",
    // },
    // emailTypeCode: {
    //   type: "integer",
    // },
    // productName: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // vatRate: {
    //   type: "integer",
    // },
    // productCode: {
    //   maxLength: 64,
    //   minLength: 0,
    //   type: "string",
    // },
    // isActive: {
    //   type: "boolean",
    // },
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

export const $createRefund_points = {
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

export const $editRefund_points = {
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

export const $showRefund_points = {
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

export const $createTax_free = {
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

export const $editTax_free = {
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

export const $showTax_free = {
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
