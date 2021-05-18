const webpack = require('webpack');
const { resolve } = require("path");
const config = require('./config');

module.exports = {
    entry: resolve(__dirname, "src/js/index.js"),
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        host: config.SERVER_HOST,
        port: config.SERVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'silent',
        compress: true,
        open: false,
        hot: true, // 热更新
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
}