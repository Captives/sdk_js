const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.config.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./index');

module.exports = merge(webpackBaseConfig, {
  context: config.source.root,
  output: {
    path: config.build.assetsRoot + config.build.assetsPublicPath,
    filename: '[name]' + config.build.version + '.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV || '"development"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
        from: config.source.root + config.source.folder,
        to: config.build.assetsRoot + config.build.assetsPublicPath,
        ignore: ['.*']
      }
    ])
  ]
});
