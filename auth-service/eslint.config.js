module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Add project-specific rules here
    },
  },
];