const webpack = require('webpack');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.devtool = 'source-map';
  config.output.publicPath = './';
  config.plugins = [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.platform': JSON.stringify('web')
    }),
    ...config.plugins,
  ]
  config.resolve.extensions.push('.ios.js');
  return config;
};

