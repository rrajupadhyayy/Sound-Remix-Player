module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'typescript-sort-keys',
    'prettier',
    'react-native',
  ],
  rules: {
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowFunctions: true,
      },
    ],
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'operator-linebreak': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react-native/no-unused-styles': 2,
    'no-unused-vars': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-console': ['error', {allow: ['warn', 'error', 'info']}],
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react/no-array-index-key': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': [
      'error',
      'asc',
      {caseSensitive: false, natural: true},
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        //
      }, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
