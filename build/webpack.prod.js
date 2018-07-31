const baseWebpackConfig = require('./webpack.base');

var conf = baseWebpackConfig;
conf.mode = 'development'; // cuz production wont work

module.exports = baseWebpackConfig;