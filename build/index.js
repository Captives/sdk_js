const path = require('path');
//输出目录配置
const source = {
  root: path.resolve(__dirname, './..'),
  folder: '/static',
  src: '/src'
};

//部署目录配置
const build = {
  version : '1.0.1',
  assetsRoot: path.resolve(__dirname, './..'),
  assetsSubDirectory: '/static',
  assetsPublicPath: '/dist'
};

//入口文件
// const entry = {
//   index: source.root + source.src + '/main.js',
//   sdk: source.root + source.src + '/uuabc-sdk.js'
// };
const entry = source.root + source.src + '/main.js';

module.exports = {
  source, build, entry
};
