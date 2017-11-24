var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './showif.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'showif.js'
  }
};