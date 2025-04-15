/**
 * 获取 Stylelint 规则文档地址
 */
export const getStylelintRuleDocUrl = (rule: string): string => {
  const match = rule.match(/^@scss\/(\S+)$/);

  if (match) {
    return `https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/${match[1]}`;
  }

  if (rule !== 'CssSyntaxError') return `https://stylelint.io/user-guide/rules/${rule}`;

  return '';
};
