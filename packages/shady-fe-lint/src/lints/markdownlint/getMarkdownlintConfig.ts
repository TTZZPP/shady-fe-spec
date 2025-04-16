import path from 'path';
import { glob } from 'glob';
import * as markdownLint from 'markdownlint';
import { readConfig } from 'markdownlint/sync';
import markdownLintConfig from 'shady-fe-markdownlint-config' with { type: 'json' };
import type { ScanOptions, PKG, Config } from '../../types.js';

type LintOptions = markdownLint.Options & { fix?: boolean };

/**
 * 获取 Markdownlint 配置
 */

export const getMarkdownlintConfig = (opts: ScanOptions, pkg: PKG, config: Config): LintOptions => {
  const { cwd } = opts;
  const lintConfig: LintOptions = {
    fix: Boolean(opts.fix),
    resultVersion: 3,
  };

  if (config.markdownlintOptions) {
    // 若用户传入了 markdownlintOptions，则用用户的
    Object.assign(lintConfig, config.markdownlintOptions);
  } else {
    const lintConfigFiles = glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd });
    if (lintConfigFiles.length === 0) {
      lintConfig.config = markdownLintConfig;
    } else {
      lintConfig.config = readConfig(path.resolve(cwd, lintConfigFiles[0]));
    }
  }

  return lintConfig;
};
