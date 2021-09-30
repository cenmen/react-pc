module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: { version: "detect" },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: "module",
  },
  globals: {},
  plugins: ["react"],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // Prevent missing props validation in a React component definition
    "react/prop-types": 0,
    // Prevent missing displayName in a React component definition
    "react/display-name": 0,
  },
}
