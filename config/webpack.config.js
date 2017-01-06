var webpack = require('webpack');
var path = require('path');

var project = require('./project.config')

var __DEV__ = project.globals.__DEV__
var __PROD__ = project.globals.__PROD__
var __TEST__ = project.globals.__TEST__

const APP_ENTRY = project.paths.client()
console.log(project.paths.dist())
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
    path: project.paths.dist(),
    filename: 'index.js',
    publicPath: project.dir_dist,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        project.paths.client(),
      ]
    }],
  },

  resolve: {
    modulesDirectories: ['node_modules']
  },
  devServer: {
    hot: true,
    host:'0.0.0.0',
    port:project.server_port,
    contentBase : project.paths.base()
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: project.env === 'development',
  devtool: 'source-map'
};

