import path from 'path';
import fsPkg from 'fs-extra';
import * as fs from 'fs-extra/esm';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as shadyFeLint from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { init } = shadyFeLint;
const { renameSync } = fsPkg;

describe('init', () => {
  const templatePath = path.resolve(__dirname, './fixtures/template/init');
  const outputPath = path.resolve(__dirname, './fixtures/template/temp');

  beforeEach(() => {
    fs.copySync(templatePath, outputPath);
    renameSync(`${outputPath}/_vscode`, `${outputPath}/.vscode`);
  });

  test('node api init should work as expected', async () => {
    await init({
      cwd: outputPath,
      checkVersionUpdate: false,
      eslintType: 'index',
      enableStylelint: true,
      enableMarkdownlint: true,
      enablePrettier: true,
    });

    const pkg = await import(`${outputPath}/package.json`, { assert: { type: 'json' } });
    const settings = await import(`${outputPath}/.vscode/settings.json`, {
      assert: { type: 'json' },
    });

    expect(settings.default['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
    expect(settings.default['eslint.validate'].includes('233')).toBeTruthy();
    expect(settings.default.test).toBeTruthy();
  });

  afterEach(() => {
    fs.removeSync(outputPath);
  });
});
