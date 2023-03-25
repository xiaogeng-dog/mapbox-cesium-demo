module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    AMap: true,
    AMapUI: true,
    Loca: true,
    Cesium:true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    "camelcase": 'off',
    'space-before-function-paren': 'off',
    'standard/computed-property-even-spacing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
