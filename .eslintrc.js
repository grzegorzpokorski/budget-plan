/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parserOptions: {
    project: ["tsconfig.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["build/", "dist/", "node_modules/", "*.js", "*.jsx"],
  rules: {
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    // following rule especialy for handleSubmit from react-hook-form
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    // "@typescript-eslint/no-empty-interface": "off",
    // "@typescript-eslint/no-unsafe-assignment": "error",
  },
};
