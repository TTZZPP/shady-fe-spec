/**
 * 将 error 级别的 style 规则降级为 warn
 */
import styleRules from '../../rules/base/style.js';

// 将传入 config 中 error 级别规则都改为 warn 级别
function setErrorRulesToWarn(config) {
  const rules = { ...config[0].rules };

  for (const ruleName in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, ruleName)) {
      const ruleValue = rules[ruleName];
      if (Array.isArray(ruleValue)) {
        // 'array-bracket-spacing': [ 'error', 'never' ] 这种规则写法
        if (ruleValue[0] === 'error') {
          ruleValue[0] = 'warn';
        }
      } else if (ruleValue === 'error') {
        // 'new-parens': 'error' 这种规则写法
        rules[ruleName] = 'warn';
      }
    }
  }

  return [{
    rules,
  }];
}

export default setErrorRulesToWarn(styleRules);
