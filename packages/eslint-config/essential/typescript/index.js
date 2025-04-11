import baseConfig from '../index.js';
import tsConfig from '../../rules/typescript.js';
import tsBlacklist from '../rules/ts-blacklist.js';

export default [
  ...baseConfig,
  ...tsConfig,
  ...tsBlacklist,
];
