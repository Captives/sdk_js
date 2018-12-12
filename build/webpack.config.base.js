const path = require('path')

const config = require('./index');

console.log(path.resolve(__dirname, '../dist'));
console.log(config.build.assetsRoot + config.build.assetsPublicPath);

module.exports = {
  entry: config.entry,
  output: {
    path: config.build.assetsRoot + config.build.assetsPublicPath,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
     }, {
       test: /\.styl$/,
       loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/',
       exclude: [/node_modules/]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {}
        // other vue-loader options go here
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/, '/static/']
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 5000,
        name: 'images/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'medias/[name].[hash:7].[ext]'
      }
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
