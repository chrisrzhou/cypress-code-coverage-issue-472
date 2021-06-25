const {startDevServer} = require('@cypress/webpack-dev-server');

const webpackConfig = require('../webpack.config.cjs');

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc.js'));
  on('dev-server:start', (options) => startDevServer({options, webpackConfig}));
  return config;
};
