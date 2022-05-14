module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: [
    'typescript',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
  },
};
