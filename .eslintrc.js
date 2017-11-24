// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 忽略;
    'semi':0,
    // 忽略缩进
    'indent':0,
    // camel case
    'camelcase':0,
    // 键值对:后强制空格
    'key-spacing':0,
    // ,前不允许空格
    'comma-spacing':0,
    // 函数空格
    'space-before-function-paren':0,
    //
    'no-unused-vars':0,
    // else 强制换行
    'brace-style':0,
    'no-unneeded-ternary': 0,
    'quotes': 0,
    'no-useless-escape': 0,
    'no-eval': 0,
    // 允许多个空格
    'no-multi-spaces': 0
  }
}
