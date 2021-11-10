/* eslint-disable import/no-extraneous-dependencies */
import merge from 'webpack-merge'
import { config } from './webpack.config.common'

export default merge(config, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: 'js/[contenthash]/[name].js',
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
})
