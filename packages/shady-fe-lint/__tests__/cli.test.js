import path from 'path';
import fsPkg from 'fs-extra';
import * as fs from 'fs-extra/esm';
import { execa } from 'execa';
import packageJson from '../package.json' with { type: 'json' };
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { readFileSync } = fsPkg;

const cli = (args, options) => {
  return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

test('--version should output right version', async () => {
  const { stdout } = await cli(['--version']);
  expect(stdout).toBe(packageJson.version);
});

describe(`'fix' command`, () => {
  const dir = path.resolve(__dirname, './fixtures/autofix');
  const outputFilePath = path.resolve(dir, './temp/temp.js');
  const errorFileContent = readFileSync(path.resolve(dir, './semi-error.js'), 'utf8');
  const expectedFileContent = readFileSync(path.resolve(dir, './semi-expected.js'), 'utf8');

  beforeEach(() => {
    fs.outputFileSync(outputFilePath, errorFileContent, 'utf8');
  });

  test('should autofix problematic code', async () => {
    await cli(['fix'], {
      cwd: path.dirname(`${dir}/result`),
    });
    expect(readFileSync(outputFilePath, 'utf8')).toEqual(expectedFileContent);
  });

  afterEach(() => {
    fs.removeSync(`${dir}/temp`);
  });
});

describe(`'exec' command`, () => {
  const semverRegex = /(\d+)\.(\d+)\.(\d+)/;

  test(`'exec eslint' should work as expected`, async () => {
    const { stdout } = await cli(['exec', 'eslint', '--version']);
    expect(stdout).toMatch(semverRegex);
  });

  test(`'exec stylelint' should work as expected`, async () => {
    const { stdout } = await cli(['exec', 'stylelint', '--version']);
    expect(stdout).toMatch(semverRegex);
  });

  test(`'exec commitlint' should work as expected`, async () => {
    const { stdout } = await cli(['exec', 'commitlint', '--version']);
    expect(stdout).toMatch(semverRegex);
  });
});
