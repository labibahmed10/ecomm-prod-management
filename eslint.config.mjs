import globals from "globals";
import pluginJs from "@eslint/js";
import { configs as tseslintConfigs } from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules/**", "dist/**"], // Add your ignore patterns here
  },
  {
    files: ["**/*.ts"], // Specify file extensions to lint
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "@typescript-eslint/no-explicit-any": "off",
      // to enforce using type for object type definitions, can be type or interface
      // "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
  },
  {
    files: ["/*.{js,mjs,cjs,ts,json}"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslintConfigs.recommended,
];
