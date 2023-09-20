module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'standard-with-typescript',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'next',
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        // Custom
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
