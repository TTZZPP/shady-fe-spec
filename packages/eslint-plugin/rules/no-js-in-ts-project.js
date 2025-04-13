// 导入 Node.js 的 path 模块，用于处理文件路径
import path from 'path';

// 定义规则名称常量
const RULE_NAME = 'no-js-in-ts-project';

// 定义检测 .jsx 文件的正则表达式
const JS_REGEX = /\.jsx$/;

// 定义默认白名单列表，这些文件允许使用 .js 扩展名
const DEFAULT_WHITE_LIST = [
  // 各种配置文件
  'commitlint.config.js',
  'eslintrc.js',
  '.eslintrc.js',
  'prettierrc.js',
  '.prettierrc.js',
  'stylelintrc.js',
  '.stylelintrc.js',
];

export default {
  // 规则名称
  name: RULE_NAME,
  // 规则元数据
  meta: {
    // 规则类型：'suggestion' 表示这是一个建议性的代码规范
    type: 'suggestion',
    // 定义规则的错误消息模板
    messages: {
      noJsInTsProject: 'The "{{fileName}}" is not recommended in TS project',
    },
  },

  // 创建规则检查器
  create(context) {
    // 获取当前文件名
    const fileName = context.filename;
    // 获取文件扩展名
    const extName = path.extname(fileName);
    // 获取规则配置选项，如果没有则使用空对象
    const ruleOptions = context.options[0] || {};
    // 从选项中解构出白名单和自动合并标志，设置默认值
    let { whiteList = [], autoMerge = true } = ruleOptions;

    // 如果没有提供白名单，使用默认白名单
    if (whiteList.length === 0) {
      whiteList = DEFAULT_WHITE_LIST;
    }
    // 如果启用了自动合并，将默认白名单和用户提供的白名单合并，并去重
    else if (autoMerge) {
      whiteList = [...new Set([...DEFAULT_WHITE_LIST, ...whiteList])];
    }

    // 将白名单数组转换为正则表达式，用于匹配文件名
    const whiteListReg = new RegExp(`(${whiteList.join('|')})$`);

    // 如果文件名不在白名单中，且是 .jsx 文件
    if (!whiteListReg.test(fileName) && JS_REGEX.test(extName)) {
      // 报告错误
      context.report({
        // 指定错误位置为文件开始
        loc: {
          start: {
            line: 0,
            column: 0,
          },
          end: {
            line: 0,
            column: 0,
          },
        },
        // 使用定义的消息 ID
        messageId: 'noJSInTSProject',
        // 传递数据到消息模板
        data: {
          fileName,
        },
      });
    }

    // 返回空对象（ESLint 规则要求）
    return {};
  },
};
