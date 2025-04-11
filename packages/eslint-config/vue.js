import baseConfig from './index.js';
import vueRules from './rules/vue.js';
import babelParser from '@babel/eslint-parser';

export default [
  ...baseConfig,
  ...vueRules,
  {
    languageOptions: {
      parser: babelParser,
    },
  },
];
