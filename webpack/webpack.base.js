/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const babelConfig = require('./webpack.babel.js');
const projectPaths = require('./webpack.project.paths.js');


module.exports.BASE_CONFIG = merge(babelConfig, {
  entry: [path.resolve(projectPaths.SOURCE_DIRECTORY, 'scripts/main.js')],
  output: {
    filename: 'bundle.js',
  },
});
