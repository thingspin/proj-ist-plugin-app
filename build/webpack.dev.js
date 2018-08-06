const baseWebpackConfig = require('./webpack.base');

var conf = baseWebpackConfig;
conf.devtool = "cheap-module-source-map";
// conf.watch = true;
conf.mode = 'development';

module.exports = conf;