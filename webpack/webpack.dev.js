/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const projectPaths = require('./webpack.project.paths');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const styles = require('./webpack.styles');


module.exports = merge(
  base.BASE_CONFIG,
  styles.generateDevScssModuleRule('styles.css'),
  {
    output: {
      path: path.resolve(projectPaths.ROOT_DIRECTORY, 'temp'),
    },
    devtool: 'source-map',
  },
);
