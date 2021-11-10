/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import merge from 'webpack-merge'
import { config } from './webpack.config.common'

export default merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.[contenthash].js',
  }
} as webpack.Configuration)
