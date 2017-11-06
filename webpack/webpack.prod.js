/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const projectPaths = require('./webpack.project.paths');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const styles = require('./webpack.styles');
const util = require('./util');


const TRANSPILED_CSS = 'styles.css';

// noinspection JSUnresolvedFunction
module.exports = merge(
  util.removeProject(projectPaths.PROD_DIRECTORY),
  styles.generateProdScssModuleRule(TRANSPILED_CSS),
  base.BASE_CONFIG,
  util.includeVendors(
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/animate.css/animate.min.css'),
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
  ),
  {
    output: {
      path: projectPaths.PROD_DIRECTORY,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  },
);
