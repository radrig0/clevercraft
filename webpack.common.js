const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');
const path = require('path');

module.exports = {
  entry: [paths.index],
  output: {
    path: paths.build,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  module: {
    strictExportPresence: false,
    noParse: [/\.test\.tsx?$/],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      mobx: __dirname + '/node_modules/mobx/lib/mobx.es6.js',
    },
    extensions: ['.tsx', '.ts', '.js', '.css', '.png', '.jpg'],
  },
  stats: {
    builtAt: true,
    children: false,
    assets: false,
    logging: 'warn',
    modules: false,
    entrypoints: false,
    warningsFilter: /export .* was not found in/,
  },
};
