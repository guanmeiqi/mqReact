# react基础项目搭建
## 环境配置
1. 编辑器：Atom/Sublime/Webstorm
2. Chrome浏览器调试
3. 安装nodejs全局环境&&npm
4. 基本命令行环境

## 创建项目
### webpack初应用
```sh
    //创建my-react文件到这个目录下
    $ mkdir my-react && cd my-react
    //用git管理这个仓库
    $ git init
    //创建.gitignore忽略文件,说明文档
    $ touch .gitignore README.md
    //初始化项目,生成package.json文件,管理项目中的依赖
    $ npm init
```
* 忽略掉不想管里的文件配置.gitignore
```
    node_modules
    .idea
    .protect
    *.log*
```
* 把app目录下的js文件编译到public下，用html文件引用
```
//创建工程目录
    $ mkdir app public && cd app
    $ touch index.js
    $ cd ../public
    $ touch index.html
//创建webpack配置文件(my-react目录下)
    $ cd ../..
    $ touch webpack.config.js
//给项目添加基本代码 
```
* app/index.js   
```js
alert("hello world!");
```
* public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React Demo</title>
</head>
<body>
<div id="app"></div>
<script src="./bundle.js"></script>
</body>
</html>
```
* webpack.config.js

```js
var path = require('path');

module.exports = {
        entry: path.resolve(__dirname, 'app/index.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
         },
    };
```

* webpack打包模块化
^ 应用场景：1.多路由gulp+webpack  2.单页应用
- 1.安装webpack
```
//全局安装webpack和webpack-dev-server,方便使用命令行
 $ npm install webpack webpack-dev-server -g
安装webpack-dev-server作用可以起服务去浏览，只安装webpack需要把文件放到public文件下
//为项目安装依赖，后续需要require使用相关的API
 $ npm install webpack webpack-dev-server --save-dev
```
- 2.命令行学习webpack
```
 $ webpack --help
``` 
- 3.配置文件webpack.config.js介绍

```js
'use strict';
        
 var path = require('path');
        
 module.exports = {
        //入口文件
    entry: './src/index.js',
        //第三方
    entry:{
      index:'./src/index.js',
      vendor:['react','react-dom']
    }
        //打包到
    output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'build')
          },
        //设置后引用文件可以省略文件后缀
    resolve: {
            extension: ['', '.js']
          },
        //此处指定什么loader要用安装 例如：
        $ npm install babel-loader --save-dev
    module: {
            loaders: [
              {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
             }
          ]
       }
    }
```

* 启动服务看效果：
```
 $ webpack-dev-server --progress --colors --content-base public
```
//通常可以把这行命令配置到 package.json文件的script里面去

```js
    {
      "name": "my-react",
      "version": "1.0.0",
      "description": "第一个react项目",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
//配置到这个位置
        "dev": "webpack-dev-server --progress --colors --content-base public"
      },
      "author": "",
      "license": "ISC",
//显示所有的依赖
      "devDependencies": {
        "babel-core": "^6.7.4",
        "babel-loader": "^6.2.4",
        "babel-preset-es2015": "^6.6.0",
        "babel-preset-react": "^6.5.0",
        "babel-preset-stage-0": "^6.5.0",
        "css-loader": "^0.23.1",
        "less": "^2.6.1",
        "less-loader": "^2.2.3",
        "react-hot-loader": "^1.3.0",
        "style-loader": "^0.13.1",
        "webpack": "^1.12.14",
        "webpack-dev-server": "^1.14.1"
      },
      "dependencies": {
        "react": "^0.14.8",
        "react-dom": "^0.14.8"
      }
    }
```

```
 $ npm run dev
```
* 通过localhost:8080访问可弹出hello world！
### React+ES6初应用  
* app/index.js
//代码react版 hello world！

```
    'use strict';
      //ES6
    import React, { Component } from 'react';
    //import React from 'react';
    import ReactDOM from 'react-dom';
    /*
     class HelloWorld extends Component {
     //class HelloWorld extends React.Component {
     render(){
        return (
            <h1>Hello world！</h1>
            )
        }
     }
     //ES5
         /*var HelloWorld=React.createClass({
             render:function(){
                 return (
                     <h1>Hello world</h1>
                 )
             }
         });*/
     ReactDOM.render(<HelloWorld />, document.getElementById('app'));*/
```
* 安装react和react-dom

```
$ npm install react react-dom --save
```
* 安装babel解析ES6和jsx
```
$ npm install babel-loader babel-core --save-dev
```
* 添加webpack配置到webpack.config.js 

```
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
//添加的内容
    module: {
    //指定了使用babel-loader来解析js文件，
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    }
};
```
* babel如何解析
```
//生成babel配置文件(my-react目录下)
 $ touch .babelrc  
```
* 配置文件.babelrc
```js
    {
    //设置预设
      "presets": ["es2015", "react", "stage-0"],
      "plugins": []
    }
```
//配置的preset字段是在为babel解析做预设，告诉babel需要使用相关的预设插件来解析代码，plugins字段，顾名思义，就是用来配置使用babel相关的插件的，这里暂且按下不表。
* 使用三个预设需要下载安装
```
$ npm install --save-dev babel-preset-es2015 babel-preset-react babel-preset-stage-0
// 其中stage-0预设是用来说明解析ES7其中一个阶段语法提案的转码规则
```
* React+ES6初应用设置完毕可以启动服务查看
```
$ npm run dev
```
* 浏览器访问localhost:8080，页面内容显示hello world！