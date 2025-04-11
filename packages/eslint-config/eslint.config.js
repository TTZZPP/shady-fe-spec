import { defineConfig } from 'eslint-define-config';
import { globalIgnores } from 'eslint/config';
import baseConfig from './index.js';

export default defineConfig([
  globalIgnores([
    // 忽略目录
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
    '**/zip/**',
    '**/demo/**',
    '**/coverage/**',
    '**/vendor/**',
    '**/lib/**',
    '**/sea-modules/**',
    '**/APP-META/**',
    // '**/test/fixtures/**',

    // 忽略文件
    '**/*.min.js',
    '**/*-min.js',
    '**/*.bundle.js',
  ]),
  ...baseConfig,
]);
