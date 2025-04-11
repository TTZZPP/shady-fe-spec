import bestPractices from './rules/base/best-practices.js';
import possibleErrors from './rules/base/possible-errors.js';
import style from './rules/base/style.js';
import variables from './rules/base/variables.js';
import es5Rules from './rules/es5.js';

export default [
  ...bestPractices,
  ...possibleErrors,
  ...style,
  ...variables,
  ...es5Rules,
];
