import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'jsx-a11y': reactA11y,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...reactA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    },
  },
  {
    // Игнорирование сгенерированных файлов
    ignores: [
      '.next/',
      'dist/',
      'build/',
      'node_modules/',
      '*.d.ts',
    ],
  },
];