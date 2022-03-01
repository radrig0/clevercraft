const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  build: resolveApp('build'),
  appHtml: resolveApp('public/index.html'),
  index: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appESLintConfig: resolveApp('.eslintrc'),
  appStyleLintConfig: resolveApp('.stylelintrc'),
  appPublic: resolveApp('public'),
};
