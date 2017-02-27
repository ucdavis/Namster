/// <binding ProjectOpened='webpack-dev-server' />
/// <binding BeforeBuild='build' Clean='clean' />


const gulp = require('gulp'),
  util = require('gulp-util'),
  webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

gulp.task('build', (callback) => {
  const config = Object.create(webpackConfig);

  webpack(config, (err, stats) => {
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
  try {
    let config = Object.create(webpackConfig);
    config = webpackMerge(config, {
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
    });

    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, {
      hot: true,
      proxy: {
        '/api/*': 'http://localhost:51041' // calls to the api should be passed back to iis
      },
      publicPath: 'http://localhost:8080/',
      stats: 'verbose',
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
  } catch (err) {
    throw new util.PluginError('webpack-dev-server', err);
  }
});
