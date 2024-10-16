import { fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vercelBrowser from "@vercel/style-guide/eslint/browser";
import vercelReact from "@vercel/style-guide/eslint/react";
import _import from "eslint-plugin-import";
import globals from "globals";

export default [
  {
    ignores: [
      "**/eslint.config.mjs",
      "**/plopfile.js",
      "**/*.config.js",
      "**/*.config.ts",
      "**/*.config.cjs",
      "**/*.config.mjs",
      "node_modules/",
      "**/vendor/",
      "public/build/",
      ".storybook/",
      "**/reports/",
    ],
  },
  {
    plugins: {
      browser: fixupPluginRules(vercelBrowser),
      react: fixupPluginRules(vercelReact),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        React: "writable",
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: true,
      },
    },

    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/unbound-method": "off",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  {
    // Rules for Storybook
    files: ["**/*.stories.*"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
