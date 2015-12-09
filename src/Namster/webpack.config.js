var path = require('path');

module.exports = {
    entry: {
        search: path.resolve("./wwwroot/js/views/search/main.jsx")
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
                }
            }
        ]
    }
};
