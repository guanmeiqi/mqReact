var path = require('path');
var webpack = require('webpack');
//css单独加载
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//9.html统一产出
var HtmlWebpackPlugin=require("html-webpack-plugin");
var publicPath = path.resolve(__dirname, 'public');
// definePlugin 会把定义的string 变量插入到Js代码中。
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});


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
    //基本的
    /*output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },*/
    //加hash
    output: {
        path: publicPath,
        filename: '[name].js?[hash]'
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
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),
        //new ExtractTextPlugin("bundle.css"),
        new ExtractTextPlugin("[name].css?[hash]", {
            allChunks: true,
            disable: false
        }),
        new HtmlWebpackPlugin({
            title: 'mq-react',
            template: './app/index.html'
        }),
        definePlugin
        ],
    //8.调试工具
    devtool: 'cheap-module-source-map'
    };