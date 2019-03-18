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

            <form className={styles.form_signin}>
                <div className={styles.form_label_group}>
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                    
                </div>

                <div className={styles.form_label_group}>
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>

        )
    }
}

export default LoginComponent;