var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var project = require('./project.config')


const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__
const __TEST__ = project.globals.__TEST__

const APP_ENTRY = project.paths.client()

module.exports = {
  entry: {
    main: __DEV__
      ? [
        `webpack-dev-server/client?${project.compiler_public_path}`,
        'webpack/hot/only-dev-server',
        APP_ENTRY
      ] : [APP_ENTRY],
    vendor : project.compiler_vendors
  },
  output: {
    path: project.paths.dist(),
    filename: '[name].js',
    publicPath : project.compiler_public_path
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        project.paths.client()
      ]
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  devServer: {
    hot: true,
    host:'0.0.0.0',
    port:project.server_port,
    contentBase: project.paths.dist(),
    historyApiFallback: {
      index: project.compiler_public_path
    }
  },
  plugins: [
    new webpack.DefinePlugin(project.globals),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: project.paths.client('index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  ],
  watch: project.env === 'development',
  devtool: 'source-map'
}

