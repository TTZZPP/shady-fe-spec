import reactConfig from '../react.js';
import tsConfig from '../../rules/typescript.js';
import tsBlacklist from '../rules/ts-blacklist.js';

export default [
  ...reactConfig,
  ...tsConfig,
  ...tsBlacklist,
];
