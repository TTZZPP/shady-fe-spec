import { ESLint } from 'eslint';
import glob from 'glob';
import type { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_FILE_EXT } from '../../utils/constants';
import { getESLintConfigType } from './getESLintConfigType';

/**
 * 获取 ESLint 配置
 */
export function getESLintConfig(opts: ScanOptions, pkg: PKG, config: Config): ESLint.Options {
  const { cwd, fix, ignore } = opts;
  const lintConfig: ESLint.Options = {
    cwd,
    fix,
    ignore,
    overrideConfig: {
      files: ESLINT_FILE_EXT.map((ext) => `**/*${ext}`),
    },
    errorOnUnmatchedPattern: false,
  };

  if (config.eslintOptions) {
    Object.assign(lintConfig, config.eslintOptions);
  } else {
    const lintConfigFiles = glob.sync('eslint.config?(.@(js|mjs|cjs|ts|mts|cts))', { cwd });
    if (lintConfigFiles.length === 0 && !pkg.eslintConfig) {
      Object.assign(lintConfig.overrideConfig, {
        extends: [getESLintConfigType(cwd, pkg), ...(config.enablePrettier ? ['prettier'] : [])],
      });
    }
  }

  return lintConfig;
}
