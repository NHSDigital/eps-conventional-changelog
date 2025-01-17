import typescriptEslint from "@typescript-eslint/eslint-plugin"
import importNewlines from "eslint-plugin-import-newlines"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import {fileURLToPath} from "node:url"
import js from "@eslint/js"
import {FlatCompat} from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [{
  ignores: ["**/lib"]
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"), {
  plugins: {
    "@typescript-eslint": typescriptEslint,
    "import-newlines": importNewlines
  },

  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest
    },

    parser: tsParser,
    ecmaVersion: "latest",
    sourceType: "module",

    parserOptions: {
      ecmaFeatures: {
        modules: true
      }
    }
  },

  rules: {
    "block-spacing": "error",
    "brace-style": ["error", "1tbs"],
    "comma-dangle": ["error", "never"],

    "comma-spacing": ["error", {
      before: false,
      after: true
    }],

    "dot-location": ["error", "property"],
    "eol-last": ["error", "always"],
    eqeqeq: "error",
    "func-call-spacing": "error",

    "func-style": ["error", "declaration", {
      allowArrowFunctions: true
    }],

    "import-newlines/enforce": ["error", {
      items: 3,
      "max-len": 120,
      semi: false
    }],

    indent: ["error", 2, {
      SwitchCase: 1
    }],

    "max-len": ["error", 120],
    "no-multi-spaces": "error",

    "no-multiple-empty-lines": ["error", {
      max: 1
    }],

    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "never"],

    quotes: ["error", "double", {
      allowTemplateLiterals: true,
      avoidEscape: true
    }],

    semi: ["error", "never"],
    "@typescript-eslint/no-explicit-any": "off"
  }
}]
