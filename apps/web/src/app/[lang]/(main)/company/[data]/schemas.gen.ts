export const $createMerchants = {
  required: ["adminEmailAddress", "adminPassword", "name"],
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

export const $showMerchants = {
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

export const $editMerchants = {
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

export const $createRefund_points = {
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
