var path = require('path');
var webpack = require('webpack');
//css单独加载
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //最基本的
    /* entry: path.resolve(__dirname, 'app/index.js'),*/
    //1.热替换
    /* entry: [
     'webpack-dev-server/client?http://localhost:8080',
     path.resolve(__dirname, 'app/index.js')
     ],*/
    //2.react-hot-loader
    /*entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/index.js')
    ],*/
    //7.将js文件的应用和第三方分开打包
    entry: {
        index: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, 'app/index.js')
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extension: ['', '.js', '.jsx', '.json']
    },
    /* module: {
     loaders: [
     {
     test: /\.js$/,
     loader: 'babel-loader'
     }
     ]
     },*/
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css/,
                //loader: 'style!css',
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less/,
                //loader: 'style!css!less'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            //5.配置图片
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            //6.配置字体图标
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new ExtractTextPlugin("bundle.css")
        ]
    };