/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

// noinspection JSUnresolvedFunction
module.exports = {
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery',
    },
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-flow-strip-types'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],
};
