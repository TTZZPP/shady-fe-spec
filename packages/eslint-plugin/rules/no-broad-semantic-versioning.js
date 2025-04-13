// 导入 Node.js 的 path 模块，用于处理文件路径
import path from 'path';

// 定义规则名称常量
const RULE_NAME = 'no-broad-semantic-versioning';

export default {
  // 规则名称
  name: RULE_NAME,
  // 规则元数据
  meta: {
    // 规则类型：'problem' 表示这是一个可能导致问题的代码规范
    type: 'problem',
    // fixable: null 表示这个规则不提供自动修复功能
    fixable: null,
    // 定义规则的错误消息模板
    messages: {
      noBroadSemanticVersioning:
        'The "{{dependencyName}}" is not recommended to use "{{versioning}}"',
    },
  },
  // 创建规则检查器
  create(context) {
    // 检查当前文件是否为 package.json
    // 如果不是，返回空对象，表示不进行检查
    if (path.basename(context.filename) !== 'package.json') {
      return {};
    }

    // 获取当前工作目录
    const cwd = context.cwd;

    return {
      // 处理 AST 中的 Property 节点
      Property: function handleRequires(node) {
        // console.log('node', node.value.properties);
        // 检查是否为 dependencies 或 devDependencies 节点
        if (
          node.key &&
          node.key.value &&
          (node.key.value === 'dependencies' || node.key.value === 'devDependencies') &&
          node.value &&
          node.value.properties
        ) {
          // 遍历所有依赖项
          node.value.properties.forEach((property) => {
            if (property.key && property.key.value) {
              // 获取依赖包名称
              const dependencyName = property.key.value;
              // 获取依赖包版本号
              const dependencyVersion = property.value.value;

              // 检查版本号是否包含不推荐使用的模式：
              // 1. '*' - 表示接受任何版本
              // 2. 'x' - 表示接受任何版本号的某个部分
              // 3. '>' - 表示接受大于某个版本的任何版本
              if (
                dependencyVersion.indexOf('*') > -1 ||
                dependencyVersion.indexOf('x') > -1 ||
                dependencyVersion.indexOf('>') > -1
              ) {
                // 报告错误，提供错误位置、消息ID和相关数据
                context.report({
                  loc: property.loc,
                  messageId: 'noBroadSemanticVersioning',
                  data: {
                    dependencyName,
                    versioning: dependencyVersion,
                  },
                });
              }
            }
          });
        }
      },
    };
  },
};
