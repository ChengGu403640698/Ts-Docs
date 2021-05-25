const webpack = require('webpack');
const { resolve } = require("path");
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: resolve(__dirname, "src/index.tsx"),
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: config.SERVER_HOST,
        port: config.SERVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'silent',
        compress: true,
        open: false,
        hot: true, // 热更新
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: 'html-loader'
            },
            {
                test: /\.(j|t)sx?$/,
                include: resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',  // jsx支持
                                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-class-properties', { 'loose': true }], // class中的箭头函数中的this指向组件
                                // ['import', {
                                //     libraryName: 'antd',
                                //     style: 'css',
                                // }]
                            ],
                            cacheDirectory: true // 加快编译速度
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif)$/, //打包的文件以jpg,png,gif结尾
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'] // 自动判断后缀名，引入时可以不带后缀
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(__dirname, 'src/index.html'),
            showErrors: true
        })
    ],
    optimization: {}
}