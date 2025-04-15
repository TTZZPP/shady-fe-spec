import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import glob from 'glob';
import ejs from 'ejs';
import {
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
} from './constants';

/**
 * 合并 VSCode 配置文件
 * @param filepath - VSCode 配置文件路径
 * @param content - 新的配置内容
 * @returns 合并后的配置内容
 */
const mergeVSCodeConfig = (filepath: string, content: string) => {
  // 如果目标文件不存在，直接返回新内容
  if (!fs.existsSync(filepath)) return content;

  try {
    // 读取现有的 VSCode 配置文件
    const targetData = fs.readJSONSync(filepath);
    // 将新配置内容解析为 JSON 对象
    const sourceData = JSON.parse(content);

    // 使用 lodash 的 mergeWith 进行深度合并
    return JSON.stringify(
      _.mergeWith(targetData, sourceData, (target, source) => {
        // 如果两个值都是数组，则合并并去重
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set(source.concat(target))];
        }
      }),
      null,
      2  // 缩进两个空格
    );
  } catch (error) {
    // 如果解析过程出错，返回空字符串
    return '';
  }
};

/**
 * 根据模板生成项目配置文件
 * @param cwd - 当前工作目录
 * @param data - 模板数据对象
 * @param vscode - 是否只处理 VSCode 配置
 */
export default (cwd: string, data: Record<string, any>, vscode?: boolean) => {
  // 获取模板文件所在目录
  const templatePath = path.resolve(__dirname, '../config');
  // 获取所有需要处理的模板文件
  // 如果是 vscode 模式，只处理 _vscode 目录下的模板
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, { cwd: templatePath });

  // 遍历所有模板文件
  for (const name of templates) {
    // 计算目标文件路径，将 _开头改为.开头，移除.ejs后缀
    const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));

    // 渲染模板内容，传入样式和 Markdown 相关的配置
    let content = ejs.render(fs.readFileSync(path.resolve(templatePath, name), 'utf8'), {
      stylelintExt: STYLELINT_FILE_EXT,          // Stylelint 要处理的文件扩展名
      stylelintIgnores: STYLELINT_IGNORE_PATTERN, // Stylelint 忽略的文件模式
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN, // Markdownlint 忽略的文件模式
      ...data,  // 其他模板数据
    });

    // 如果是 VSCode 配置文件，需要与现有配置合并
    if (/^_vscode/.test(name)) {
      content = mergeVSCodeConfig(filepath, content);
    }

    // 如果渲染结果为空（去除空格后），跳过该文件
    if (!content.trim()) continue;

    // 写入文件内容，如果目录不存在会自动创建
    fs.outputFileSync(filepath, content, 'utf8');
  }
};
