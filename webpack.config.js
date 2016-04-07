var path = require('path');

module.exports = {
    //热替换
    /* entry: [
     'webpack-dev-server/client?http://localhost:8080',
     path.resolve(__dirname, 'app/index.js')
     ],*/
    //react-hot-loader
    /*entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/index.js')
    ],*/
    //最基本的
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
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
                //loaders: ['react-hot', 'babel'],
               // exclude: path.resolve(__dirname, 'node_modules')
                loader: 'babel-loader'
            },
            {
                test: /\.css/,
                loader: 'style!css'
            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            }
        ]
    }
   /* plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        ]*/
    };