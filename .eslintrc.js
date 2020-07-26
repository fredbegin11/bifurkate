module.exports = {
  globals: {
    __PATH_PREFIX__: true,
    document: true,
    window: true,
    localStorage: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'prettier/prettier': ['error'],
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-one-expression-per-line': 0,
      },
    },
  ],
};
