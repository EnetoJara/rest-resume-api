module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: false
    }
  },
  settings: {
    polyfills: ["promises"],
    "import/resolver": {
      node: {
        moduleDirectory: "node_modules"
      }
    }
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "space-before-function-paren": ["error", "always"],
    indent: ["error", 4],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "always"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        arraysInObjects: false
      }
    ],
    "template-curly-spacing": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "block-spacing": ["error", "always"],
    "no-else-return": "error",
    "no-nested-ternary": "error",
    "require-await": "error",
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    "prefer-const": "error",
    "no-var": "error",
    "no-use-before-define": "error",
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/consistent-type-assertions": 0,
    "@typescript-eslint/unbound-method": 0,
    "@typescript-eslint/no-var-requires": 0,
    "no-dupe-args": "error",
    "no-inner-declarations": "error",
    "no-irregular-whitespace": "error",
    "no-unexpected-multiline": "error",
    "no-unsafe-finally": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "consistent-return": "error",
    curly: "error",
    eqeqeq: "error",
    "no-else-return": "error",
    "require-await": "error",
    "no-shadow": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "error",
    "callback-return": "error",
    "array-bracket-spacing": "error",
    "block-spacing": "error",
    camelcase: "error",
    "capitalized-comments": "error",
    "key-spacing": "error",
    "padding-line-between-statements": "error",
    "newline-per-chained-call": "error",
    "space-before-blocks": "error",
    "spaced-comment": "error",
    "no-this-before-super": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": "error",
    "prefer-spread": "error",
    "template-curly-spacing": "error",

	"padding-line-between-statements": ["error",
	{ blankLine: "always", prev: "*", next: ["return"] },
    { blankLine: "always", prev: "directive", next: "*" },
	{ blankLine: "always", prev: "directive", next: "*" },

	{ blankLine: "always", prev: ["const", "let", "var"], next: "*"},
	{ blankLine: "never", prev: ["const", "let", "var"], next: ["const", "let", "var"]},
    { blankLine: "always", prev: "export", next: ["const", "let", "var", "function"]}
]
  }
};
