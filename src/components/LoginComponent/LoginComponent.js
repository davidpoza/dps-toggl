import React, {Component} from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom';


import styles from './LoginComponent.scss';
import ConfigComponent from '../ConfigComponent/ConfigComponent';


class LoginComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        this.state = {
            email: "",
            password: ""
        };        
    }

    handleOnClick(){
        this.props.actions.loginUser(this.state.email, this.state.password);
    }


    handleOnChange(e){
        if(e.target.id == "inputEmail")
            this.setState({
                email: e.target.value,
            });
        else if(e.target.id == "inputPassword")
            this.setState({
                password: e.target.value
            });
    }

    render(){
        return(

            <form className={styles.form_signin}>
                {this.props.user.error.message && <div className="alert alert-danger" role="alert">{this.props.user.error.message}</div>}
                <div className={styles.form_label_group}>
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus text={this.state.email} onChange={this.handleOnChange}/>
                    
                </div>

                <div className={styles.form_label_group}>
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required text={this.state.password} onChange={this.handleOnChange}/>
                    
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleOnClick}>Login</button>
            </form>

        )
    }
}

export default LoginComponent;