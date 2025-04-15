import { sync as commandExitsSync } from 'command-exists';

// 检查 npm 类型
const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  if (!commandExitsSync('pnpm')) {
    resolve('npm');
  }

  resolve('pnpm');
});

export default promise;
