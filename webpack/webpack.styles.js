/* eslint-disable import/no-extraneous-dependencies */
const importOnce = require('node-sass-import-once');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEV_CSS_LOADER = {
  loader: 'css-loader',
};

const PROD_CSS_LOADER = {
  loader: 'css-loader',
  options: {
    minimize: true,
  },
};


const SASS_LOADER = {
  loader: 'sass-loader',
  options: {
    importer: importOnce,
    importOnce: {
      index: false,
      css: false,
      bower: false,
    },
  },
};

const generateScssModuleRule = function generateScssModuleRule(destPath, cssLoader) {
  return {
    entry: ['./src/styles/styles.scss'],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract([
            cssLoader,
            SASS_LOADER,
          ]),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: destPath,
      }),
    ],
  };
};

const generateDevScssModuleRule = function generateDevScssModuleRule(destPath) {
  return generateScssModuleRule(destPath, DEV_CSS_LOADER);
};

const generateProdScssModuleRule = function generateProdScssModuleRule(destPath) {
  return generateScssModuleRule(destPath, PROD_CSS_LOADER);
};

module.exports.generateDevScssModuleRule = generateDevScssModuleRule;
module.exports.generateProdScssModuleRule = generateProdScssModuleRule;
