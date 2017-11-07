/* eslint-disable import/no-extraneous-dependencies */
const importOnce = require('node-sass-import-once');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const merge = require('webpack-merge');

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

const includeTranspiledScss = function includeTranspiledScss(destPath) {
  return {
    plugins: [
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [destPath],
        append: false,
      }),
    ],
  };
};

const generateDevScssModuleRule = function generateDevScssModuleRule(destPath) {
  return merge(
    generateScssModuleRule(destPath, DEV_CSS_LOADER),
    includeTranspiledScss(destPath),
  );
};

const generateProdScssModuleRule = function generateProdScssModuleRule(destPath) {
  return merge(
    generateScssModuleRule(destPath, PROD_CSS_LOADER),
    includeTranspiledScss(destPath),
  );
};

module.exports.generateDevScssModuleRule = generateDevScssModuleRule;
module.exports.generateProdScssModuleRule = generateProdScssModuleRule;
