const path = require('path')
const ip = require('ip')

const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_test   : 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : ip.address(),
  server_port : process.env.PORT || 8080,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
  },
  compiler_public_path     : '/',
  compiler_devtool         : 'source-map',
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux-saga',
    'redux'
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test'
}

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}

// ========================================================
// Environment Configuration
// ========================================================
const environments = require('./environments.config')
const overrides = environments[config.env]
if (overrides) {
  Object.assign(config, overrides(config))
}

module.exports = config
