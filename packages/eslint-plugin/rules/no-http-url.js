// 定义规则名称常量
const RULE_NAME = 'no-http-url';

export default {
  // 规则名称
  name: RULE_NAME,
  // 规则元数据
  meta: {
    // 规则类型：'suggestion' 表示这是一个建议性的代码规范
    type: 'suggestion',
    // fixable: null 表示这个规则不提供自动修复功能
    fixable: null,
    // 定义规则的错误消息模板
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS',
    },
  },
  // 创建规则检查器
  create(context) {
    return {
      // 处理 AST 中的字面量节点（字符串、数字等）
      Literal: function handleRequires(node) {        
        // 检查节点是否为字符串类型且以 'http:' 开头
        if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
          // 报告错误，提供节点位置、消息ID和相关数据
          context.report({
            node,
            messageId: 'noHttpUrl',
            data: {
              url: node.value,
            },
          });
        }
      },
    };
  },
};
