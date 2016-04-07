'use strict';

import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
//
import App from './container/App';
//button
/*import Button from './components/Button/Button';*/
//hello world
//ES5
/*var HelloWorld=React.createClass({
 render:function(){
 return (
 <h1>Hello world</h1>
 )
 }
 });*/
//ES6
/*class HelloWorld extends Component {
    //class HelloWorld extends React.Component {
    render() {
        return (
            <h1>Hello world!</h1>
        )
    }
}
ReactDOM.render(<HelloWorld />, document.getElementById('app'));*/

let root = document.getElementById('app');
// button
//ReactDOM.render( <Button />, root );
//App
ReactDOM.render( <App />, root );
