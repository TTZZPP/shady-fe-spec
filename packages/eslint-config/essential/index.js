/**
 * essential 级别出口文件仅将会必要的规则设置为 error 级别
 */

import baseConfig from '../index.js';
import styleWarn from './rules/set-style-to-warn.js';
import blacklist from './rules/blacklist.js';
import es6Blacklist from './rules/es6-blacklist.js';

export default [
  ...baseConfig,
  ...styleWarn,
  ...blacklist,
  ...es6Blacklist,
];
