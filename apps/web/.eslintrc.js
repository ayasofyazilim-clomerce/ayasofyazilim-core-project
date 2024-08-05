module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["unused-imports"],
  extends: ["@repo/eslint-config/next.js", "eslint:recommended"],
  ignorePatterns: ["**/language-management/form.tsx", "**/vendor/*.js"],
  rules: {
    /* Should stay disabled */
    camelcase: "off",
    "import/no-cycle": "off",
    "no-await-in-loop": "off",

    /* Fix to enable */
    "@typescript-eslint/no-unsafe-return": "off", // /dashboard/[domain]/[data]/page.tsx, company/[data]/page.tsx, src/utils.ts içinde hatalar var
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
  },
};
