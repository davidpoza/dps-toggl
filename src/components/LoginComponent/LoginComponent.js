import React, {Component} from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom';


import styles from './LoginComponent.scss';
import ConfigComponent from '../ConfigComponent/ConfigComponent';


class LoginComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                Login

            </div>
        )
    }
}

export default LoginComponent;