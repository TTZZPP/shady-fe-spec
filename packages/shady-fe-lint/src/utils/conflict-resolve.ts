import path from 'path';
import fs from 'fs-extra';
import { glob } from 'glob';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import log from './log.js';
import { PKG_NAME } from './constants.js';
import type { PKG } from '../types.js';

// 需要精确移除的依赖包名列表
const packageNamesToRemove = [
  '@babel/eslint-parser',
  '@commitlint/cli',
  '@iceworks/spec',
  'babel-eslint',
  'eslint',
  'husky',
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',
];

// 需要按前缀匹配移除的依赖包前缀列表
const packagePrefixesToRemove = [
  '@commitlint/',
  '@typescript-eslint/',
  'eslint-',
  'stylelint-',
  'markdownlint-',
  'commitlint-',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 检查项目中可能存在的无用配置文件
 * @param cwd - 当前工作目录
 * @returns 返回需要删除的配置文件列表
 */
const checkUselessConfig = (cwd: string): string[] => {
  return (
    []
      // 搜索 ESLint 相关配置文件
      .concat(glob.sync('.eslintrc?(.@(yaml|yml|json))', { cwd }))
      // 搜索 Stylelint 相关配置文件
      .concat(glob.sync('.stylelintrc?(.@(yaml|yml|json))', { cwd }))
      // 搜索 Markdownlint 相关配置文件
      .concat(glob.sync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd }))
      // 搜索 Prettier 相关配置文件
      .concat(
        glob.sync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd })
      )
      // 搜索 TSLint 相关配置文件
      .concat(glob.sync('tslint.@(yaml|yml|json)', { cwd }))
      // 搜索其他自定义配置文件
      .concat(glob.sync('.kylerc?(.@(yaml|yml|json))', { cwd }))
  );
};

/**
 * 检查需要重写的配置文件
 * @param cwd - 当前工作目录
 * @returns 返回需要重写的配置文件列表
 */
const checkRewriteConfig = (cwd: string) => {
  return (
    glob
      // 搜索 config 目录下的所有 ejs 模板文件
      .sync('**/*.ejs', { cwd: path.resolve(__dirname, '../config') })
      // 将模板文件名转换为实际配置文件名
      .map((name) => name.replace(/^_/, '.').replace(/\.ejs$/, ''))
      // 过滤出已存在的配置文件
      .filter((filename) => fs.existsSync(path.resolve(cwd, filename)))
  );
};

/**
 * 处理项目中的配置冲突
 * @param cwd - 当前工作目录
 * @param rewirteConfig - 是否重写配置文件的标志
 * @returns 返回更新后的 package.json 内容
 */
export default async (cwd: string, rewirteConfig?: boolean) => {
  // 读取项目的 package.json
  const pkgPath = path.resolve(cwd, 'package.json');
  const pkg: PKG = fs.readJSONSync(pkgPath);

  // 获取所有依赖包名列表
  const dependencies = [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || {})
  );

  // 筛选出需要移除的依赖包
  const willRemovePackage = dependencies.filter((name) => {
    packageNamesToRemove.includes(name) ||
      packagePrefixesToRemove.some((prefix) => name.startsWith(prefix));
  });

  // 获取需要处理的配置文件列表
  const uselessConfig = checkUselessConfig(cwd);
  const reWriteConfig = checkRewriteConfig(cwd);
  const willChangeCount = willRemovePackage.length + uselessConfig.length + reWriteConfig.length;

  // 如果存在需要处理的内容，显示提示信息
  if (willChangeCount > 0) {
    log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖和配置，为保证正常运行将`);

    // 显示将要删除的依赖
    if (willRemovePackage.length > 0) {
      log.warn('删除以下依赖：');
      log.warn(JSON.stringify(willRemovePackage, null, 2));
    }

    // 显示将要删除的配置文件
    if (uselessConfig.length > 0) {
      log.warn('删除以下配置文件：');
      log.warn(JSON.stringify(uselessConfig, null, 2));
    }

    // 显示将要重写的配置文件
    if (reWriteConfig.length > 0) {
      log.warn('覆盖以下配置文件：');
      log.warn(JSON.stringify(reWriteConfig, null, 2));
    }

    // 如果未指定是否重写配置，则询问用户
    if (typeof rewirteConfig === 'undefined') {
      const { isOverWrite } = await inquirer.prompt({
        type: 'confirm',
        name: 'isOverWrite',
        message: '请确认是否继续：',
      });

      // 用户取消操作则退出程序
      if (!isOverWrite) process.exit(0);
    } else if (!reWriteConfig) {
      // 如果指定不重写配置则退出程序
      process.exit(0);
    }
  }

  // 删除冲突的配置文件
  for (const name of uselessConfig) {
    fs.removeSync(path.resolve(cwd, name));
  }

  // 清理 package.json 中的配置
  delete pkg.eslintConfig;
  delete pkg.eslintIgnore;
  delete pkg.stylelint;

  // 删除冲突的依赖
  for (const name of willRemovePackage) {
    delete (pkg.dependencies || {})[name];
    delete (pkg.devDependencies || {})[name];
  }

  // 写入更新后的 package.json
  fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');

  return pkg;
};
