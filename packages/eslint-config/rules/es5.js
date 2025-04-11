/**
 * 本文件用于覆盖掉个别 ES5 与 ES6 不同的规则
 */
import js from '@stylistic/eslint-plugin';

export default [{
  plugins: {
    '@stylistic/js': js,
  },
  rules: {
    // 逗号风格 - ES5 中不加最后一个逗号
    // @unessential
    '@stylistic/js/comma-dangle': ['error', 'never'],
  },
}];
