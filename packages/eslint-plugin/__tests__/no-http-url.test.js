'use strict';

import rule from '../rules/no-http-url';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://aa.com'",
    },
  ],
  invalid: [
    {
      code: "var test = 'http://aa.com'",
      output: "var test = 'http://aa.com'",
      errors: [
        {
          message: 'Recommended "http://aa.com" switch to HTTPS',
        },
      ],
    },
  ],
});
