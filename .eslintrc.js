module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
