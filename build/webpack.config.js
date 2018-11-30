const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');

const webpackBaseConfig = require('./webpack.config.base');
const config = require('./index');
module.exports = merge(webpackBaseConfig, {
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    inline: true,
    hot: true,
    allowedHosts:[

    ],
    host: 'local.uuabc.com',
    port: 8443,
    // https: {
    //   key: fs.readFileSync(path.join(__dirname, '/uuabc_com.key')),
    //   cert: fs.readFileSync(path.join(__dirname,'/uuabc_com_bundle.crt'))
    // }
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: config.source.root + config.source.static,
      to: config.build.assetsRoot + config.build.assetsPublicPath,
      ignore: ['.*']
    }])
  ]
});
