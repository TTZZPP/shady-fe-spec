import fg from 'fast-glob';
import fsPkg from 'fs-extra';
import { LintError } from 'markdownlint';
// import { lintPromise } from 'markdownlint/lib/markdownlint.mjs';
import { lint as lintPromise } from 'markdownlint/promise';
import markdownlintRuleHelpers from 'markdownlint-rule-helpers';
import { extname, join } from 'path';
import { Config, PKG, ScanOptions } from '../../types.js';
import { MARKDOWN_LINT_FILE_EXT, MARKDOWN_LINT_IGNORE_PATTERN } from '../../utils/constants.js';
import { formatMarkdownlintResults } from './formatMarkdownlintResults.js';
import { getMarkdownlintConfig } from './getMarkdownlintConfig.js';

export interface DoMarkdownlintOptions extends ScanOptions {
  pkg: PKG;
  config?: Config;
}

const { readFile, writeFile } = fsPkg;

export const doMarkdownlint = async (options: DoMarkdownlintOptions) => {
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) => MARKDOWN_LINT_FILE_EXT.includes(extname(name)));
  } else {
    const pattern = join(
      options.include,
      `**/*.{${MARKDOWN_LINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: MARKDOWN_LINT_IGNORE_PATTERN,
    });
  }

  const results = await lintPromise({
    ...getMarkdownlintConfig(options, options.pkg, options.config),
    files,
  });
  // 修复
  if (options.fix) {
    await Promise.all(
      Object.keys(results).map((filename) => formatMarkdownFile(filename, results[filename]))
    );
    for (const file in results) {
      if (!Object.prototype.hasOwnProperty.call(results, file)) continue;
    }
  }

  return formatMarkdownlintResults(results, options.quiet);
};

async function formatMarkdownFile(filename: string, errors: LintError[]) {
  const fixes = errors?.filter((error) => error.fixInfo);

  if (fixes?.length > 0) {
    const originalText = await readFile(filename, 'utf8');
    const fixedText = markdownlintRuleHelpers.applyFixes(originalText, fixes);
    if (originalText !== fixedText) {
      await writeFile(filename, fixedText, 'utf8');
      return errors.filter((error) => !error.fixInfo);
    }
  }
  return errors;
}
