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
  let config = Object.create(webpackConfig);
  config = webpackMerge(config, {
    devtool: 'inline-source-map',
    output: {
      publicPath: 'http://localhost:8080/'
    },
    module: {
      loaders: [{
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });

  const compiler = webpack(config);
  new WebpackDevServer(compiler, {
    hot: true
  }).listen(8080, 'localhost', (err) => {
    if (err) {
      throw new util.PluginError('webpack-dev-server', err);
    }
    // Server listening
    util.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');

    // keep the server alive or continue?
    // callback();
  });
});
