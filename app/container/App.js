import React, { Component } from 'react';
import Button from '../components/Button/Button';

import 'bootstrap/dist/css/bootstrap.css';
import './App.less';

class App extends Component {
    render(){
        return (
            //<div className="app">
            <div className="text-center">
                <Button />
                <div className="tip"></div>
                {/* 这里我们使用以下图标字体 */}
                <span className="glyphicon glyphicon-asterisk">我爱中国</span>
            </div>
        );
    }
}

export default App;