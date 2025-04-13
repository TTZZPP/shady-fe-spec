import rule from '../rules/no-broad-semantic-versioning';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('no-broad-semantic-versioning', rule, {
  valid: [
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'shady-fe-eslint-plugin': '^0.0.5' },
      })}`,
    },
    {
      filename: 'package.js',
      code: 'var t = 1',
    },
  ],

  invalid: [
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'shady-fe-eslint-plugin': '*' },
      })}`,
      errors: [
        {
          message: 'The "shady-fe-eslint-plugin" is not recommended to use "*"',
        },
      ],
    },
  ],
});
