var webpack = require('webpack');
var path = require("path");

var DIST_DIR = path.resolve(__dirname,"dist");
var SRC_DIR = path.resolve(__dirname,"src");

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
     contentBase: './dist'
   },
  module:{
    rules:[
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets:["react","es2015","stage-2"]
        }
      }
    ]
  }
};

module.exports = config;
