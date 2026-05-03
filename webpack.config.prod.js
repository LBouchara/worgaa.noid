const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pages = ['home', 'portfolio', 'information'];

const htmlPlugins = pages.map(
  (name) =>
    new HtmlWebpackPlugin({
      template: `./${name}.html`,
      filename: `${name}.html`,
      inject: false,
    })
);

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    ...htmlPlugins,
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
