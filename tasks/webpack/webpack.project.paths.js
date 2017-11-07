/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const ROOT_DIRECTORY = path.resolve(__dirname, '../../');
module.exports.ROOT_DIRECTORY = ROOT_DIRECTORY;
module.exports.SOURCE_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');
module.exports.DEV_DIRECTORY = path.join(ROOT_DIRECTORY, 'temp');
module.exports.PROD_DIRECTORY = path.join(ROOT_DIRECTORY, 'build');
