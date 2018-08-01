const baseWebpackConfig = require('./webpack.base');

var conf = baseWebpackConfig;
conf.devtool = "eval";

module.exports = conf;