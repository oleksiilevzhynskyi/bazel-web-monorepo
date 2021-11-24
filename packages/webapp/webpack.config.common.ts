/* eslint-disable import/no-extraneous-dependencies */
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import 'webpack-dev-server'

export const dist = path.resolve(__dirname, 'dist')
export const context = path.resolve(process.cwd(), '../')

const projectsWithSourcemaps = [
  'denali-platform',
  'denali-utils',
  'denali-rx-utils',
  'telemetry.ts',
  'platform-config'
]

export const config: webpack.Configuration = {
  entry: {
    index: path.resolve(__dirname, './src/index.tsx')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        },
        resolve: { mainFields: ['es2015', 'module', 'main'] }
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        // Include symlink packages e.g. <projectRoot>/packages/<packageDir>
        include: projectsWithSourcemaps.map(name => path.resolve(context, '../', name)),
        enforce: 'pre',
        resolve: { mainFields: ['es2015', 'module', 'main'] }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|mp4|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'],
      filename: 'index.html'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, './tsconfig.json')
      }
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
