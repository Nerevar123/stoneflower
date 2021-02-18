module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
};
