# react基础项目搭建
## 环境配置
1. 编辑器：Atom/Sublime/Webstorm
2. Chrome浏览器调试
3. 安装nodejs全局环境&&npm
4. 基本命令行环境

## 创建项目

### 1. webpack初应用

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

> 把app目录下的js文件编译到public下，用html文件引用

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

**webpack打包模块化** 

> 应用场景：1.多路由gulp+webpack  2.单页应用

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

通常可以把这行命令配置到 package.json文件的script里面去

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

* 启动项目

```
 $ npm run dev
```

* 通过localhost:8080访问可弹出hello world！

### 2. React+ES6初应用  

* app/index.js

  **react代码版 hello world！** 

```js
    'use strict';
      //ES6
    import React, { Component } from 'react';
    //import React from 'react';
    import ReactDOM from 'react-dom';
   
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
     ReactDOM.render(<HelloWorld />, document.getElementById('app'));
```

* 安装react和react-dom

```sh
$ npm install react react-dom --save
```

* 安装babel解析ES6和jsx

```sh
$ npm install babel-loader babel-core --save-dev
```

* 添加webpack配置到webpack.config.js 

```js
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

```sh
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

```sh
$ npm install --save-dev babel-preset-es2015 babel-preset-react babel-preset-stage-0
// 其中stage-0预设是用来说明解析ES7其中一个阶段语法提案的转码规则
```

* React+ES6初应用设置完毕可以启动服务查看

```sh
$ npm run dev
```

* 浏览器访问localhost:8080，页面内容显示hello world！

### 3. 深入学习webpack

#### 3.1 实现代码热替换
更新webpack.config.js入口文件配置即可实现编辑器中保存代码就可在浏览器中实现刷新的效果

* webpack.config.js

```js
entry: [
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/index.js')
]
```

#### 3.2 使用react-hot-loader实现组件级的hot reload
  （当有多个组件的时候，修改哪个run哪个）
  
* 安装react-hot-loader

```sh
$ npm install --save-dev react-hot-loader
```

* webpack.config.js

```js
var path = require('path');
//插入组件需要引入webpack
var webpack = require('webpack');

module.exports = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot', 'babel'],
          exclude: path.resolve(__dirname, 'node_modules')
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
};
//这里新增了react-hot-loader去解析React组件，同时加上了热替换的插件HotModuleReplacementPlugin和防止报错的插件NoErrorsPlugin，如果这里不用HotModuleReplacementPlugin这个插件也可以，只需要在webpack-dev-server运行的时候加上--hot这个参数即可，都是一样的。
```

#### 3.3 加载解析样式文件

* 安装...loader

```sh
$ npm install --save-dev style-loader css-loader less-loader
```

* webpack.config.js

```js
loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            //实际项目中loader: 'style!css？....'后面会有很多参数
            {
                test: /\.css/,
                loader: 'style!css'
            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            }
        ]
```

> 测试：在app目录新增一个基本的React组件，然后在index.js中引用这个组件

```sh
//新增一个目录components并且在目录下新建一个Button组件（建议开头大写）
$ cd app && mkdir components
$ cd components && mkdir Button
$ cd Button && touch Button.js Button.less
```

* app/components/Button.js

```js
import React, { Component } from 'react';
import './Button.less';

class Button extends Component {
    handleClick(){
        alert('戳我干嘛！');
    }
    render(){
        //const style = require('./Button.less');

        return (
        //以跑通项目为主，不建议this.handleClick.bind(this)写
            <button className="my-button" onClick={this.handleClick.bind(this)}>
                快戳我
            </button>
        );
    }
}

export default Button;
```

* app/components/Button.less

```
.my-button {
  color: #fff;
  background-color: #2db7f5;
  border-color: #2db7f5;
  padding: 4px 15px 5px 15px;
  font-size: 14px;
  border-radius: 6px;
}
```

* 浏览器访问localhost:8080，页面内容显示button按钮，点击提示弹窗

* css文件的引入，解析，运行已经跑通，样式会以style的形式放在head里面
//上面例子目前css文件全部被打包在bundle.js一个文件里，代码量多需要性能优化

#### 3.4 css文件单独加载

* 安装extract-text-webpack-plugin

```
$ npm install extract-text-webpack-plugin --save-dev

```

* require 引入，配置webpack.config.js

```
var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
      extension: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot', 'babel'],
          exclude: path.resolve(__dirname, 'node_modules')
        },
        {
          test: /\.css/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.less/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("bundle.css")
    ]
};
```

* public/index.html(index.html去引入bundle.css文件)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React Demo</title>
    <link rel="stylesheet" href="bundle.css">
</head>
<body>
<div id="app"></div>
<script src="./bundle.js"></script>
</body>
</html>
```

* 单独加载css文件配置完毕

```
$ npm run dev
```

* 浏览器访问localhost:8080，页面内容显示button按钮，点击提示弹窗
//此时样式是通过外链link引入到head中

#### 3.5 图片资源加载

* 安装url-loader

```
$ npm install --save-dev url-loader
```

* webpack.config.js

```js
loaders: [
  {
  //匹配了png和jpg两种格式的图片
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }
]
//设置了limit参数值是8192，意思是匹配到小于8K（8 * 2014=8192）的图片时将其进行base64转化后放入文件中，大于8k的图片则进行单独加载。
```

> 测试：新建一个container目录用于存放容器级（可以粗略的理解为页面级）组件，新建一个static目录用于存放图片、图标字体、音频视频等资源，我们下载两张图片放入用于后续的代码引用

```sh
$ cd app && mkdir container static
$ cd container && touch App.js App.less
```

* 调整index.js中代码，将index.js只加载App容器组件，App加载组件Button

* app/index.js

```
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';

let root = document.getElementById('app');
ReactDOM.render( <App />, root );
```

* app/container/App.js

```js
import React, { Component } from 'react';
import Button from '../components/Button/Button';

import './App.less';

class App extends Component {
  render(){
    return (
      <div className="app">
        <Button />
        <div className="tip"></div>
      </div>
    );
  }
}

export default App;
```

* app/container/App.less

```less
.app {
  width: 200px;
  height: 300px;
  // 这是一张19K的jpg图片
  background-image: url(../static/a.jpg);
  position: relative;
  }
  .tip {
    width: 100px;
    height: 80px;
    // 这是一张2k的png图片
    background-image: url(../static/d.jpg);
    position: absolute;
    right: -100px;
  }
```

* 图片配置完毕

```
$ npm run dev
```

* 浏览器访问localhost:8080,正常展示后看控制台的信息，2k的图片被base64，19k的图片正常加载

#### 3.6 图标字体的加载

* 可选file-loader 或 url-loader 进行加载，配置如下（示例配置，在项目中最好还是按实际情况配置）

```js
{
  test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
  loader: "url?limit=10000"
}
```

* * 更多loader可以参考webpack wiki  https://github.com/webpack/docs/wiki/list-of-loaders

> 测试:下载bootstrap，它给我们提供了整套的css并且还有优秀的图标字体库。

```sh
$ npm install bootstrap --save
```

* app/container/App.js  在App.js里面应用bootstrap

```js
import React, { Component } from 'react';
import Button from '../components/Button/Button';

//引入bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import './App.less';

class App extends Component {
  render(){
    return (
      <div className="text-center">
        <Button />
        <div className="tip"></div>
        {/* 这里我们使用以下图标字体 */}
        <span className="glyphicon glyphicon-asterisk"></span>
      </div>
    );
  }
}

export default App;
```

* bootstrap配置完毕

```
$ npm run dev
```

* 浏览器访问localhost:8080，显示图标

#### 3.7 将js文件的应用和第三方分开打包

* webpack.config.js 修改webpack配置中的entry入口，并添加CommonsChunkPlugin插件抽取出第三方资源

```js
entry: {
 index: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/index.js')
  ],
  vendor: ['react', 'react-dom']
},
plugins: [
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoErrorsPlugin(),
   new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
   new ExtractTextPlugin("bundle.css")
 ]
```

* public/index.html 修改index.html文件的引用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React Demo</title>
    <link rel="stylesheet" href="./bundle.css">
</head>
<body>
<div id="app"></div>
<script src="vendor.js"></script>
<script src="./bundle.js"></script>
</body>
</html>
```

* vendor文件配置完毕

```
$ npm run dev
```

* 浏览器访问localhost:8080，显示js文件的应用和第三方分开

#### 3.8 调试工具

* webpack.config.js

```js
//在webpack.config.js配置中新增devtool字段
devtool: 'cheap-module-source-map'
```

* devtool配置完毕

```
$ npm run dev
```

* 浏览器访问localhost:8080，在控制台的sources下，点开可以看到webpack://目录，调试源码

#### 3.9 将html统一产出

……前面是在public目录手动加上index.html，这样在项目中不是很适用，因为我们希望public产出的资源应该是通过工具来统一产出并发布上线，这样质量和工程化角度来思考是更合适的。

> 在app目录下新建一个index.html文件，并写上简单的代码

```sh
$ cd app && touch index.html
```

* app/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reactdemo</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

* 安装webpack插件html-webpack-plugin

```sh
$ npm install --save-dev html-webpack-plugin
```

* webpack.config.js

```js
// 引用这个plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 这里省略其他配置代码

plugins: [
      // 使用这个plugin，这是最简单的一个配置，更多资料可到github查看
      new HtmlWebpackPlugin({
        title: 'mq-react',
        template: './app/index.html',
      })
]
```

* 运行npm run dev，效果正常(public目录下的html删除了)。
 
#### 3.10 添加文件的hash
 
....我们的开发的产品最终是要上线的，添加文件hash可以解决由于缓存带来的问题，所以我们需要试着给文件加上hash。简单的写法在文件的后面加上?[hash]就行

* webpack.config.js

```js
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var publicPath = path.resolve(__dirname, 'public');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      index: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/index.js')
      ],
      vendor: ['react', 'react-dom']
    },
    output: {
        path: publicPath,
        filename: '[name].js?[hash]'
    },
    resolve: {
      extension: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot', 'babel'],
          exclude: path.resolve(__dirname, 'node_modules')
        },
        {
          test: /\.css/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.less/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url?limit=8192'
        },
        {
          test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000"
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),
      new ExtractTextPlugin("[name].css?[hash]", {
          allChunks: true,
          disable: false
      }),
      new HtmlWebpackPlugin({
        title: 'mq-react',
        template: './app/index.html',
      })
    ],
    devtool: 'cheap-module-source-map'
};
```

* 区分环境的标识

项目中有些代码我们只为在开发环境（例如日志）或者是内部测试环境（例如那些没有发布的新功能）中使用，那就需要引入下面这些魔法全局变量（magic globals）：

```js
if (__DEV__) {
  console.warn('Extra logging');
}
// ...
if (__PRERELEASE__) {
  showSecretFeature();
}
```

* 同时还要在webpack.config.js中配置这些变量，使得webpack能够识别他们

```js
// definePlugin 会把定义的string 变量插入到Js代码中。
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  plugins: [definePlugin]
};
```

···配置完成后，就可以使用 BUILD_DEV=1 BUILD_PRERELEASE=1 webpack来打包代码了。 值得注意的是，webpack -p 会删除所有无作用代码，也就是说那些包裹在这些全局变量下的代码块都会被删除，这样就能保证这些代码不会因发布上线而泄露。

* 第十点没有明白
   实际项目开发的时候，需要增添很多功能，比如开发环境和生产环境的不同配置；打包的优化配置；让运行时的解析更快；配合测试框架...









