const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = (process.env.NODE_ENV === 'production');

const config = {
  entry: {
    app: path.resolve(__dirname, './wwwroot/js/index'),
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-toolbox']
  },
  output: {
    path: path.resolve('./wwwroot/dist/'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  context: __dirname,
  devtool: production ? false : 'inline-source-map',
  target: 'web',
  resolve: {
    extensions: ['.jsx', '.js', '.css', '.scss', '.json'],
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }, {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              sourceMap: !production
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                /* eslint-disable */
                require('postcss-import'),
                require('postcss-cssnext')({
                  features: {
                    customProperties: {
                      variables: require('./wwwroot/js/styles/themeVariables'),
                    },
                  },
                }),
                require('postcss-nested'),
                /* eslint-enable */
              ])
            }
          }]
        })
      }, {
        test: /\.(jpe?g|gif|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            context: path.resolve(__dirname, 'wwwroot'),
            emitFile: false,
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      ignoreOrder: true
    })
  ]
};

if (production) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));

  config.plugins.push(new UglifyJsPlugin({
  }));
}

module.exports = config;
