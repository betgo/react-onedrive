const withCss = require('@zeit/next-css')
const config = require('./config')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
  }

  module.exports = withCss({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      })
      return config
    },
    publicRuntimeConfig: {
      MICROSOFT_OAUTH_URL: config.MICROSOFT_OAUTH_URL,
      OAUTH_URL: config.OAUTH_URL,
    },
  })