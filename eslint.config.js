import { defineConfig } from 'eslint/config';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig([
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
			},
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},
		plugins: {
			'@typescript-eslint': eslintPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'warn',
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'@typescript-eslint/member-ordering': 'warn',
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: 'interface',
					format: ['PascalCase'],
					custom: { regex: '^I[A-Z]', match: true },
				},
			],
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
			'prettier/prettier': 'error',
		},
	},
]);
