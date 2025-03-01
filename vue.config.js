const path = require('path')
const moment = require('moment')

process.env.VUE_APP_BUILD_TIME = moment().toISOString()

// const fs = require('fs')
// const webpack = require('webpack')
// const packageJson = fs.readFileSync('./package.json')
// const version = JSON.parse(packageJson).version || 0

// for gitlab
// const prodPath = process.env.CI_PROJECT_NAME ?? 'kim_pro_frontend'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${process.env.PUBLIC_PATH}` : '/',
  lintOnSave: false,
  devServer: {
    proxy: 'https://api.preprod.seybold-fm.com',
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env.PACKAGE_VERSION': `${version}`,
      //   'process.env.CI_VERSION': process.env.CI_COMMIT_SHORT_SHA,
      //   'process.env.CI_DATE': process.env.CI_COMMIT_TIMESTAMP,
      // }),
    ],
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
}
