const PROXY_CONFIG = {
  '/users/**': {
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONFIG;
