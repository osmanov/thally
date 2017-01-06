module.exports = {

  development : (config) => ({
    compiler_public_path : `http://${config.server_host}:${config.server_port}/`
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production : (config) => ({
    compiler_devtool         : null,
  })
}
