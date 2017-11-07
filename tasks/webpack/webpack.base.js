/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelConfig = require('./webpack.babel.js');
const projectPaths = require('./webpack.project.paths.js');


module.exports.BASE_CONFIG = merge(babelConfig, {
  entry: [path.resolve(projectPaths.SOURCE_DIRECTORY, 'scripts/main.js')],
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.resolve(projectPaths.SOURCE_DIRECTORY, 'img'), to: 'img'},
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(projectPaths.SOURCE_DIRECTORY, 'template.html'),
    }),
  ],
});
