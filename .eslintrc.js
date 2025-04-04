module.exports = {
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
    rules: {
      "prettier/prettier": ["error"],
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  };
  