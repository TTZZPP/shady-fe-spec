// 保持导入部分不变
import fg from 'fast-glob';
import fsPkg from 'fs-extra';
import { extname, join } from 'path';
import prettier from 'prettier';
import { ScanOptions } from '../../types.js';
import { PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN } from '../../utils/constants.js';

// 定义 Prettier 选项接口，继承自基础扫描选项
export interface DoPrettierOptions extends ScanOptions {}

const { readFile, writeFile } = fsPkg;

/**
 * 执行 Prettier 格式化
 * @param options - 格式化配置选项
 */
export async function doPrettier(options: DoPrettierOptions) {
  let files: string[] = [];

  // 如果指定了具体文件，则过滤出支持的文件类型
  if (options.files) {
    files = options.files.filter((name) => PRETTIER_FILE_EXT.includes(extname(name)));
  } else {
    // 否则根据配置生成 glob 匹配模式
    const pattern = join(
      options.include,
      // 将文件扩展名数组转换为 glob 模式，如: "**/*.{js,jsx,ts,tsx}"
      `**/*.{${PRETTIER_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`
    );
    // 使用 fast-glob 查找所有匹配的文件
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: PRETTIER_IGNORE_PATTERN, // 排除不需要处理的文件
    });
  }

  // 并行处理所有文件的格式化
  await Promise.all(files.map(formatFile));
}

/**
 * 格式化单个文件
 * @param filepath - 文件路径
 */
async function formatFile(filepath: string) {
  // 读取文件内容
  const text = await readFile(filepath, 'utf8');

  // 获取该文件的 Prettier 配置
  const options = await prettier.resolveConfig(filepath);

  // 使用 Prettier 格式化内容
  const formatted = await prettier.format(text, { ...options, filepath });

  // 将格式化后的内容写回文件
  await writeFile(filepath, formatted, 'utf8');
}
