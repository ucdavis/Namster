var path = require('path');
var webpack = require("webpack");

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: path.resolve(__dirname, "./wwwroot/js/views/app"),
        list: path.resolve("./wwwroot/js/views/list/main.jsx"),
        vendor: ['react', 'material-ui']
    },
    resolve: {
        alias: {
            'react': path.resolve(nodeModulesPath, 'react')
        },
        extensions: ['', '.jsx', '.js']
    },

    output: {
        path: path.resolve("./wwwroot/js/dist/"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                },
                exclude: [nodeModulesPath]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    ]
};
