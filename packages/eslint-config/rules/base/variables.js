import globals from 'globals';

export default [
  {
    // 预设的环境，使用这些环境中的全局变量不会被 no-undef 报错
    // @link https://eslint.org/docs/user-guide/configuring#specifying-environments
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jasmine,
        ...globals.jest,
        ...globals.jquery,
        ...globals.mocha,
        ...globals.es3,
        ...globals.es5,
        ...globals.es2015,
        ...globals.es2016,
        ...globals.es2017,
        ...globals.es2018,
        ...globals.es2019,
        ...globals.es2020,
        ...globals.es2021,
        ...globals.es2022,
        ...globals.es2023,
        ...globals.es2024,
        ...globals.es2025,
      },
    },
    rules: {
      // 强制或禁止在变量声明时进行赋值
      'init-declarations': 'off',

      // 禁止 delete 变量
      'no-delete-var': 'error',

      // 禁止标签与变量同名
      'no-label-var': 'error',

      // 禁用使用特定的全局变量
      'no-restricted-globals': 'off',

      // 禁止变量与外层作用域已存在的变量同名
      // @unessential
      'no-shadow': 'error',

      // 禁止使用保留字命名变量
      'no-shadow-restricted-names': 'error',

      // 禁止使用未声明的变量
      'no-undef': 'error',

      // 不要将变量初始化成 undefined
      'no-undef-init': 'error',

      // 禁止使用 undefined
      'no-undefined': 'off',

      // 声明的变量必须被使用
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

      // 不要在声明前就使用变量
      'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    },
  },
];
