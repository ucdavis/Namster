const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const debug = (process.env.NODE_ENV !== 'production');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './wwwroot/js/index'),
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-toolbox']
  },
  output: {
    path: path.resolve('./wwwroot/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  context: __dirname,
  devtool: debug ? 'inline-source-map' : false,
  target: 'web',
  resolve: {
    extensions: ['.jsx', '.js', '.css', '.scss', '.json'],
    modules: [
      'node_modules',
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
              sourceMap: debug
            }
          }, {
            loader: 'postcss-loader',
            options: {
              // sourceMap: debug,
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
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),

    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
      disable: debug
    })
  ]
};
