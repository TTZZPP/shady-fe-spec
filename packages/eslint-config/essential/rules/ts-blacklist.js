import js from '@stylistic/eslint-plugin';

export default [{
  plugins: {
    '@stylistic/js': js,
  },
  rules: {
    // 使用 2 个空格缩进
    // @unessential
    '@stylistic/js/indent': 'off',

    // 使用分号
    // @unessential
    '@stylistic/js/semi': 'off',

    // '@typescript-eslint/adjacent-overload-signatures': 'warn',

    // '@typescript-eslint/no-parameter-properties': 'warn',
  },
}];
