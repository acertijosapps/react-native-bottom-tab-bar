const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*', '.expo/*', 'node_modules/*'],
    },
    {
        plugins: { 'simple-import-sort': simpleImportSort },
        settings: {
            'import/resolver': {
                typescript: { project: './tsconfig.json' },
            },
        },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^react\\u0000?$', '^react-native(/|$)'],
                        ['^@/store', '^@/services', '^@/db'],
                        ['^@/components', '^@/features'],
                        ['^@/hooks', '^@/context'],
                        ['^@?\\w'],
                        ['^@/styles'],
                        ['^@/assets'],
                        ['^@/utils', '^@/navigation'],
                        ['^@expo/vector-icons'],
                        [
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$',
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                        ],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'import/order': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            'no-empty': ['error', { allowEmptyCatch: true }],
        },
    },
]);
