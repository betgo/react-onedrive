const withCss = require('@zeit/next-css')
const config = require('./config')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
  }

  module.exports = withCss({
    publicRuntimeConfig: {
      MICROSOFT_OAUTH_URL: config.MICROSOFT_OAUTH_URL,
      OAUTH_URL: config.OAUTH_URL,
    },
  })