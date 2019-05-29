const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  target: 'node',
  context: resolve('src'),
  entry:{
    'module.js' : './module.ts',
    'panel/thingspin-ist-controller-panel/module.js' : './panel/thingspin-ist-controller-panel/module.ts',
    'panel/thingspin-ist-method-panel/module.js' : './panel/thingspin-ist-method-panel/module.ts',
    'panel/thingspin-image-panel/module.js' : './panel/thingspin-image-panel/module.ts',
    'panel/thingspin-image-processing-panel/module.js' : './panel/thingspin-image-processing-panel/module.ts'
  },
  output: {
    path: resolve('dist'),
    filename: "[name]",
    libraryTarget: "amd"
  },
  externals: [
    function (context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: '**/*.json' },
      { from: '**/img/*'},
      { from: 'img/**' },
      { from: '**/*.css' },
      { from: '**/*.svg' },
      { from: '**/*.html' },
    ]),
  ],
  resolve: {
    extensions: [".ts", ".js", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.(html|svg)$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.tsx?$/,
        loaders: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [/node_modules/],
      },
      
      {
        test: /\.js$/,
        include:path.join(__dirname),
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            presets : ['es2015'],
            plugins : ['transform-es2015-modules-systemjs', 'transform-es2015-for-of']
          }
        },
        exclude: /node_modules/,
      },
      
    ]
  }
}
