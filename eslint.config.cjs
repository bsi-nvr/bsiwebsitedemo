module.exports = {
  ignores: ['node_modules/', '.next/'],
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    prettier: require('eslint-plugin-prettier'),
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ],
}
