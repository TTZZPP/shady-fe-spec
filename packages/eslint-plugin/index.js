import { fileURLToPath } from 'url'
import path from 'path'
import requireAll from 'require-all'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rules = requireAll({
  dirname: path.resolve(__dirname, 'rules'),
});

const configs = requireAll({
  dirname: path.resolve(__dirname, 'configs'),
});

const processors = {
  '.json': {
    preprocess(text) {
      // As JS file
      return [`module.exports = ${text}`];
    },
  },
};

export default {
  rules,
  configs,
  processors,
}