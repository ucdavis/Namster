const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const bundleOutputDir = './wwwroot/dist';

module.exports = env => {
    const isDevBuild = !(env && env.prod);
    const isAnalyze = env && env.analyze;

    return [
        {
          stats: {
            modules: false
          },
          entry: [
            isDevBuild && require.resolve('webpack-dev-server/client') + '?/',
            './ClientApp/index'
            //app: path.resolve(__dirname, './wwwroot/js/index'),
            //vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-toolbox']
          ].filter(Boolean),
          output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/dist/',
            devtoolModuleFilenameTemplate: info =>
              path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
          },
          devServer: {
            clientLogLevel: 'info',
            compress: true,
            port: process.env.DEV_SERVER_PORT || 8080,
            injectClient: false,
            // transportMode: 'ws',  // TODO: move to WS once it's no longer experimental
            contentBase: path.resolve(__dirname, 'wwwroot')
          },
          mode: isDevBuild ? 'development' : 'production',
          resolve: {
            alias: { 'react-dom': '@hot-loader/react-dom' },
            extensions: ['.jsx', '.js', '.css', '.scss', '.json'],
            modules: [
              'node_modules'
            ]
          },
          module: {
            rules: [
              {
                test: /\.jsx?$/,
                include: /ClientApp|node_modules[\/\\](react-toolbox)/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      "presets": [
                        "@babel/preset-react",
                        "@babel/preset-env"
                      ],
                      "plugins": [
                        [
                          "@babel/plugin-proposal-class-properties",
                          {
                            "loose": true
                          }
                        ],
                        "@babel/plugin-proposal-export-default-from"
                      ]
                    }
                  }
                ]
              }, 
              {
                test: /\.css$/,
                use: [
                  !isDevBuild
                    ? MiniCssExtractPlugin.loader
                    : {
                        loader: 'style-loader'
                      },
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
              },
              {
                test: /\.scss$/,
                //include: /ClientApp|node_modules[\/\\](react-toolbox)/,
                use: [
                  !isDevBuild
                    ? MiniCssExtractPlugin.loader
                    : {
                        loader: 'style-loader'
                      },
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
              },
              {
                test: /\.(png|jpg|jpeg|gif|svg|woff)$/,
                use: 'url-loader?limit=25000'
              }
            ]
          },
          optimization: {
            minimizer: isDevBuild
              ? []
              : [
                  new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                  }),
                  new OptimizeCssAssetsPlugin({})
                ],
            splitChunks: {
              chunks: 'all',
              cacheGroups: {
                default: false,
                vendor: {
                  name: 'vendor',
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10
                }
              }
            }
          },
          plugins: [
            ...(isDevBuild
              ? [
                  // Plugins that apply in development builds only
                  new webpack.EvalSourceMapDevToolPlugin({
                    filename: '[file].map' // Remove this line if you prefer inline source maps
                  })
                ]
              : [
                  // Plugins that apply in production builds only
                  new webpack.SourceMapDevToolPlugin({
                    filename: '[file].map' // Remove this line if you prefer inline source maps
                  }),
                  new MiniCssExtractPlugin({
                    filename: 'site.min.css'
                  })
                ]),
                // Webpack Bundle Analyzer
                // https://github.com/th0r/webpack-bundle-analyzer
                ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
          ]
        }
        ];
};
