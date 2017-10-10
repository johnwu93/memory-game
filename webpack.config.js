/* eslint-disable */
const path = require('path');

module.exports = {
  entry: './src/scripts/main.js',
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery',
    },
    extensions: ['.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
};
