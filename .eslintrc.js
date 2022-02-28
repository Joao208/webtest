module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-restricted-syntax': 'off',
    comma-dangle: 'off',
  },
}
