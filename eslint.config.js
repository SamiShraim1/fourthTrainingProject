import globals from "globals";

// Flat config بسيط يعمل مع ESLint v9، بدون Plugins
export default [
  // القاعدة العامة لكل ملفات JS
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  },

  // ملفات Mocha (unit tests)
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: { ...globals.mocha }
    }
  },

  // ملفات Cypress (e2e)
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      globals: { ...globals.mocha, ...globals.browser, cy: true, Cypress: true }
    }
  }
];
