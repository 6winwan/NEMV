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
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, 
    'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
    'consistent-return': 0, // ['error', { 'treatUndefinedAsUnspecified': false }],
    'no-param-reassign': 0,
    // 'no-undef': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'object-shorthand': 0,
  }
}
/*
module.exports = {
  extends: 'google',
  quotes: [2, 'single'],
  globals: {
    SwaggerEditor: false
  },
  env: {
    browser: true
  },
  rules:{
    "linebreak-style": 0
  }
};*/
