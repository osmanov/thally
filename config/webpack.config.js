const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const project = require('./project.config')

const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__
const __TEST__ = project.globals.__TEST__

const APP_ENTRY = project.paths.client()


let plugins=[
  new webpack.DefinePlugin(project.globals),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
  }),
]


if (__DEV__) {
  plugins.push(new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: project.paths.client('index.html'),
    })
  )
}

if (__PROD__) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: project.paths.client('index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  )
}

module.exports = {
  entry: {
    main: __DEV__
      ? [
        `webpack-dev-server/client?${project.compiler_public_path}`,
        'webpack/hot/only-dev-server',
        APP_ENTRY,
      ] : [APP_ENTRY],
    vendor: project.compiler_vendors,
  },
  output: {
    path: project.paths.dist(),
    filename: '[name].js',
    publicPath: project.compiler_public_path,
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'react-hot-loader',
        },
        {
          loader: 'babel-loader',
        },
      ],
      include: [
        project.paths.client(),
      ],
    }],
  },
  resolve: {
    modules: [
      project.paths.client(),
      'node_modules',
    ],
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: project.server_port,
    contentBase: project.paths.dist(),
    historyApiFallback: {
      index: project.compiler_public_path,
    },
  },
  plugins,
  watch: project.env === 'development',
  devtool: 'source-map',
}

