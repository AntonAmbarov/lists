import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
            prettier,
        },
        files: ['**/*.js'],
        ignores: ['eslint.config.js'],
        rules: {
            ...typescriptEslint.configs['recommended'].rules,
            ...prettierConfig.rules,
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            'semi': ['error', 'always'],
            'prettier/prettier': [
                'error', // Или 'warn', если хотите предупреждения вместо ошибок
                {
                    singleQuote: true,
                    useTabs: true,
                    semi: true,
                    trailingComma: 'all',
                    bracketSpacing: true,
                    printWidth: 100,
                    endOfLine: 'auto',
                },
            ],
        },
    },
];