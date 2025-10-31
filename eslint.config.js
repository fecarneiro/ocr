// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    overrides: [
      {
        files: ['tests/**/*'],
        plugins: ['jest'],
        env: {
          'jest/globals': true,
        },
      },
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
]);

import { defineConfig } from 'eslint/config';
import globals from 'globals';
