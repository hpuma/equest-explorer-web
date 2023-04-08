module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      version: "detect",
      sourceType: "module"
    }
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.jsx", "*.js"]
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  rules: {
    semi: [2, "always"],
    quotes: [2, "double"],
    indent: [1, 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "off",
    "no-unused-vars": 0,
    "react/prop-types": "off",
    "prettier/prettier": 0
  }
};
