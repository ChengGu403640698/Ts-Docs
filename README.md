# 学习ts的--配置tsc
1. npm init 
2. npm install -S typescript
3. npx tsc --init
4. change tsconfig.json
add {
    "rootDir":"./src",
    "outDir":"./dist",
}
5. code with typescript
# 如何自己搭建一个简单的脚手架
1.  npm init -> # 初始化
    npm install -D webpack webpack-dev-server webpack-cli -> # webpack相关
    npm install -D html-loader  -> # 配置loader
    npm install -D awesome-typescript-loader -> 配置typescript-loader
    npm install -D style-loader css-loader less-loader -> #样式loader
    npm install less -S ->
    npm install -D file-loader -> # 图片loader
    npm install -D babel-loader @babel/core @babel/plugin-proposal-class-properties @babel/polyfill @babel/ preset-env @babel/preset-react -> # 配置babel
    npm install -D html-webpack-plugin -> # html插件
    npm install -S typescript react react-dom @types/react @types/react-dom -> #react+ts工程所需的包
    npm install @types/react-router-dom react-router-dom -> #react-router
    npm install -S query-string @types/query-string ->
  
2. 创建合适的工程目录结构
```javascript
-- root
    -- dist
    -- src
        -- index.html
        -- index.tsx
    -- package.json + package-lock.json
    -- webpack.config.js
    -- tsconfig.json
    -- config.js // 这里一般放一些通用配置
```
3. 首先添加ts配置--tsconfig.json
```javascript
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./src/js",
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```
4. 写config.js+webpack.config.js配置
```javascript
// config.js

const SERVER_PORT = 1022
const SERVER_HOST = '127.0.0.1'
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    isDev,
    SERVER_PORT,
    SERVER_HOST
}
//----------------------------------------------------------------------------------------
// webpack.config.js

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
        open: true,
        hot: true, // 热更新
    },
    module:{
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
                            ['@babel/plugin-proposal-class-properties', { 'loose': true }] 
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
        }
    ]},
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
```
6. package.json
```javascript
"script":{
    "start" : "webpack serve --open",
    "build": "webpack --mode production"
}
```