import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './LoginComponent.scss';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


class LoginComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.inputEmail = React.createRef();
        this.inputPassword = React.createRef();

        this.state = {
            email: "",
            password: "",
            btn_enabled: false,
        };        
    }

    handleOnClick(){
        this.props.userActions.loginUser(this.state.email, this.state.password, this.props.history);
        
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

        this.setState({
            btn_enabled: this.state.email == "" && this.state.password == "" ? false:true
        });

    }

    render(){
        if(this.props.user.token != null) //autenticado
            return(<Redirect to="/" />)
        else
            return(

                <form className={styles.form_signin}>
                    <LoadingComponent isLoading={this.props.user.loading} />
                    
                    <div className={styles.form_label_group}>
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" id="inputEmail" ref={this.inputEmail} className="form-control" placeholder="Email address" required autoFocus text={this.state.email} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>
                        
                    </div>

                    <div className={styles.form_label_group}>
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" ref={this.inputPassword} className="form-control" placeholder="Password" required text={this.state.password} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>
                        
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleOnClick} disabled={!this.state.btn_enabled}>Login</button>
                </form>

            )
    }
}

LoginComponent.propTypes = {
    history: PropTypes.object.isRequired, //lo vamos a pasar al thunk de redux loginAction para redirigir después del login
    user: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
}


export default LoginComponent;