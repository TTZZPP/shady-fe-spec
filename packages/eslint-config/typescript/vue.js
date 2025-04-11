import tsConfig from './index.js';
import vueRules from '../rules/vue.js';
import vueEslintParser from 'vue-eslint-parser';

export default [
  ...tsConfig,
  ...vueRules,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        // https://github.com/mysticatea/vue-eslint-parser#parseroptionsparser
        vueEslintParser,
      },
    },
  },
];
