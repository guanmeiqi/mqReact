/*if (__DEV__) {
    console.warn('Extra logging');
}
// ...
if (__PRERELEASE__) {
    showSecretFeature();
}*/

import React, { Component } from 'react';
//import './Button.less';

class Button extends Component {
    handleClick(){
        alert('戳我干嘛！');
    }
    render(){
        const style = require('./Button.less');

        return (
            <button className="my-button" onClick={this.handleClick.bind(this)}>
                快戳我
            </button>
        );
    }
}

export default Button;