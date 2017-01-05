var NODE_ENV=process.env.NODE_ENV || 'development';
var webpack=require('webpack');
var path = require('path');

module.exports = {
  entry:{
    main:[
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './src/index'
    ]
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
      loaders: ['react-hot','babel'],
      include: [
        path.join(__dirname, 'src'),
      ]
    }],

  },

  resolve: {
    modulesDirectories: ['node_modules']
  },
  devServer:{
    hot:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  watch:NODE_ENV==='development',
  devtool:'source-map'
};
