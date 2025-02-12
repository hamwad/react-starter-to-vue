import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      "plugin:vue/vue3-recommended",
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs["vue3-recommended"].rules,
    },
  }
);
