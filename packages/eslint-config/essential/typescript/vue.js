import tsConfig from './index.js';
import vueRules from '../../rules/vue.js';
import typescriptParser from '@typescript-eslint/parser';

export default [
  ...tsConfig,
  ...vueRules,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: typescriptParser,
    },
  },
];
