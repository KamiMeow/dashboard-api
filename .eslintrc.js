module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  plugins: [
    'babel',
    'jest',
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
