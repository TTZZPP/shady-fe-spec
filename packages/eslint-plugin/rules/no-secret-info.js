// 定义规则名称常量
const RULE_NAME = 'no-secret-info';

// 定义默认的敏感关键词列表
const DEFAULT_DANGEROUS_KEYS = ['secret', 'token', 'password'];

export default {
  // 规则名称
  name: RULE_NAME,

  // 规则元数据
  meta: {
    // 规则类型：'problem' 表示这是一个可能导致问题的代码规范
    type: 'problem',
    // 不提供自动修复功能
    fixable: null,
    // 定义规则的错误消息模板
    messages: {
      noSecretInfo: 'Detect that the "{{secret}}" might be a secret token, Please check!',
    },
  },

  // 创建规则检查器
  create(context) {
    // 获取规则配置选项，如果没有则使用空对象
    const ruleOptions = context.options[0] || {};
    // 从选项中解构出危险关键词列表和自动合并标志，设置默认值
    let { dangerousKeys = [], autoMerge = true } = ruleOptions;

    // 如果没有提供危险关键词，使用默认列表
    if (dangerousKeys.length === 0) {
      dangerousKeys = DEFAULT_DANGEROUS_KEYS;
    }
    // 如果启用了自动合并，将默认关键词和用户提供的关键词合并，并去重
    else if (autoMerge) {
      dangerousKeys = [...new Set([...DEFAULT_DANGEROUS_KEYS, ...dangerousKeys])];
    }
    // 将危险关键词数组转换为正则表达式，用于匹配变量名
    const reg = new RegExp(dangerousKeys.join('|'));
    
    return {
      // 处理字面量节点
      Literal: function handleRequires(node) {
        if (
          node.value &&
          node.parent &&
          // 检查变量声明，例如: const password = "123456"
          ((node.parent.type === 'VariableDeclarator' &&
            node.parent.id &&
            node.parent.id.name &&
            reg.test(node.parent.id.name.toLocaleLowerCase())) ||
            // 检查对象属性，例如: { password: "123456" }
            (node.parent.type === 'Property' &&
              node.parent.key &&
              node.parent.key.name &&
              reg.test(node.parent.key.name.toLocaleLowerCase())))
        ) {
          // 报告发现的敏感信息
          context.report({
            node,
            messageId: 'noSecretInfo',
            data: {
              secret: node.value,
            },
          });
        }
      },
    };
  },
};
