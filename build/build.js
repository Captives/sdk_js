const webpack = require('webpack');
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const config = require('./index');

const spinner = ora('building for production...'+'\n');
spinner.start();
function build(webpackConfig) {
  return new Promise(function (resolve, reject) {
    webpack(webpackConfig, (err, stats) => {
      if (err) reject(err);
      process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1);
      }
      resolve();
    })
  });
}

console.log(chalk.cyan('  Building for production...\n'));
rm(path.join(config.build.assetsRoot, config.build.assetsPublicPath), err => {
  if (err) throw err;
  const webpackConfig = require('./webpack.config.sdk');
  const webpackConfigMin = require('./webpack.config.sdk.min');
  Promise.all([build(webpackConfig), build(webpackConfigMin)]).then(function () {
    spinner.stop();
    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'));
  }).catch(function (err) {
    console.log(chalk.red(err + '\n'));
  });
});
