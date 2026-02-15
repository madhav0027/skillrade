import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, pluginReact },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ["dist", "build", "node_modules"],
  },
  pluginReact.configs.flat.recommended,
]);
