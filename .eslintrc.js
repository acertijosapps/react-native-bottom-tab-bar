module.exports = {
    root: true,
    extends: '@react-native',
    plugins: ['simple-import-sort'],
    ignorePatterns: ['lib/', 'node_modules/'],
    rules: {
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^\\u0000'],
                    ['^react\\u0000?$', '^react-native(/|$)'],
                    ['^@?\\w'],
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
        '@typescript-eslint/no-explicit-any': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
    },
    overrides: [
        {
            files: ['**/*.test.{ts,tsx}'],
            env: { jest: true },
        },
    ],
};
