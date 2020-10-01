const HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },

            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "images/[name]-[hash].[ext]",
                    },
                },
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ]
}