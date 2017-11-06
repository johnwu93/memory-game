/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VENDORS_DIR = 'vendors/';

module.exports.includeVendors = function includeVendors(...vendorsFilePath) {
  const copyCommands = vendorsFilePath.map(filePath => ({
    from: filePath,
    to: VENDORS_DIR,
  }));

  const vendorFileNames = vendorsFilePath.map((fileName) => {
    const locations = fileName.split('/');
    return path.join(VENDORS_DIR, locations[locations.length - 1]);
  });

  return {
    plugins: [
      new CopyWebpackPlugin(copyCommands),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: vendorFileNames,
        append: false,
      }),
    ],
  };
};

module.exports.removeProject = function removeProject(directory) {
  return {
    plugins: [
      new CleanWebpackPlugin(['*'], {root: directory}),
    ],
  };
};

