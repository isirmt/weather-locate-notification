module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "prettier"],
  globals: {
    RequestInit: true
  },
  ignorePatterns: ["src-tauri/*", ".next/*", "node_modules/*", ".github/*", "out/*"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
}
