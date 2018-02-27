const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: "[name].css",
  allChunks: true
});

module.exports = (env) => {
  const webpackConfig = {
    mode: 'production',
    context: path.resolve(__dirname, './src'),
    entry: {
      index: './index.js',
    },

    plugins: [
      new HtmlWebpackPlugin({
        showErrors: true,
        inject: true,
        filename: 'index.html',
      }),
      extractCSS,
    ],
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: extractCSS.extract('css-loader')
        },
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/]
        },
      ]
    }
  }
  
  return webpackConfig;
};
