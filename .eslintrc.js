module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'babel',
  ],
  parser: 'babel-eslint',
  rules: {
    'import/prefer-default-export': 'warn',
    'class-methods-use-this': 'warn',
    'jest/no-disabled-tests': 'off',
    'consistent-return': 'off',
    'arrow-parens': 'warn',
    'no-console': 'off',
  },
};
