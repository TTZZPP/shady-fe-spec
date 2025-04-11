import es5Config from '../es5.js';
import styleWarn from './rules/set-style-to-warn.js';
import blacklist from './rules/blacklist.js';
import js from '@stylistic/eslint-plugin';

export default [
  ...es5Config,
  ...styleWarn,
  ...blacklist,
  {
    plugins: {
      '@stylistic/js': js,
    },
    rules: {
      // 逗号风格 - ES5 中不加最后一个逗号
      // @unessential
      '@stylistic/js/comma-dangle': ['warn', 'never'],
    },
  },
];
