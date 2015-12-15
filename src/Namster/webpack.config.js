var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        search: path.resolve("./wwwroot/js/views/search/main.jsx"),
        list: path.resolve("./wwwroot/js/views/list/main.jsx")
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
    }
};
