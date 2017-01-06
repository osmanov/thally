var webpack = require('webpack');
var path = require('path');

var project = require('./config/project.config')

var __DEV__ = project.globals.__DEV__
var __PROD__ = project.globals.__PROD__
var __TEST__ = project.globals.__TEST__

const APP_ENTRY = './src/index'
console.log(project.compiler_public_path)
module.exports = {
  entry: {
    main: __DEV__
      ? [
        `webpack-dev-server/client?${project.compiler_public_path}`,
        'webpack/hot/only-dev-server',
        APP_ENTRY
      ] : [APP_ENTRY]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'src'),
      ]
    }],
  },

  resolve: {
    modulesDirectories: ['node_modules']
  },
  devServer: {
    hot: true,
     host:'0.0.0.0',
     port:project.server_port
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: project.env === 'development',
  devtool: 'source-map'
};

