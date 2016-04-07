'use strict';

import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button/Button';
//ES5
/*var HelloWorld=React.createClass({
    render:function(){
        return (
            <h1>Hello world</h1>
        )
    }
});*/
//ES6
 class HelloWorld extends Component {
 //class HelloWorld extends React.Component {
 render(){
 return (
 <h1>Hello world！</h1>
 )
 }
 }

 ReactDOM.render(<HelloWorld />, document.getElementById('app'));
/*
let root = document.getElementById('app');
ReactDOM.render( <Button />, root );*/
