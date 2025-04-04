import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";


export default defineConfig([
  tseslint.configs.recommended,
  { files: ["src/**/*.ts"] },
  { files: ["src/**/*.ts"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.ts"], plugins: { js }, rules: { "@typescript-eslint/no-explicit-any": "warn" } },
  {
    files: ["**/*.spec.ts"], // match spec files anywhere
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
