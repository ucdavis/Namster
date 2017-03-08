/// <binding ProjectOpened='webpack-dev-server' />
/// <binding BeforeBuild='build' Clean='clean' />

const gulp = require('gulp'),
  util = require('gulp-util'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

gulp.task('build', (callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new util.PluginError('build', err);
    }
    util.log('[build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    setup: (app) => {
      app.on('listening', () => {
        util.log('listening fired');
      });
      app.on('err', (err) => {
        throw new util.PluginError('webpack-dev-server', err);
      });
      app.on('close', () => {
        util.log('close fired');
        callback();
      });
    }
  }).listen(8080, 'localhost');
  return server.app;
});
