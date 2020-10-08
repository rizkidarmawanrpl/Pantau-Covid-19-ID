const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: ["lodash"],
                            presets: [["@babel/preset-env", { "modules": false, "targets": { "node": 4 }}]]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new LodashModuleReplacementPlugin
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
})