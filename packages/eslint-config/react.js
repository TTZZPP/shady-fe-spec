import baseConfig from './index.js';
import reactRules from './rules/react.js';

export default [
  ...baseConfig,
  ...reactRules,
  {
    languageOptions: {
      parserOptions: {
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
  },
];
