import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './LoginComponent.scss';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


class LoginComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
        this.handleOnClickSignup = this.handleOnClickSignup.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.inputEmail = React.createRef();
        this.inputPassword = React.createRef();

        this.state = {
            email: "",
            password: "",
            btn_enabled: false,
        };
    }

    handleOnClickLogin(e){
        e.preventDefault();
        this.props.userActions.loginUser(this.state.email, this.state.password, this.props.history);

    }

    handleOnClickSignup(e){
        e.preventDefault();
        this.props.history.push("/signup");

    }


    handleOnChange(e){
        if(e.target.id == "inputEmail")
            this.setState({
                email: e.target.value,
                btn_enabled: e.target.value == "" || this.state.password == "" ? false:true
            });
        else if(e.target.id == "inputPassword")
            this.setState({
                password: e.target.value,
                btn_enabled: this.state.email == "" || e.target.value == "" ? false:true
            });
    }

    render(){
        if(this.props.user.token != null) //autenticado
            return(<Redirect to="/" />)
        else
            return(
                <form className={styles.form_signin}>
                    <h1>{lang[config.lang].login_section_h1}</h1>
                    <LoadingComponent isLoading={this.props.user.loading} />

                    <div className={styles.form_label_group}>
                        <label htmlFor="inputEmail">{lang[config.lang].login_section_email_input}</label>
                        <input type="email" id="inputEmail" ref={this.inputEmail} className="form-control" placeholder={lang[config.lang].login_section_email_placeholder} required autoFocus text={this.state.email} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>

                    </div>

                    <div className={styles.form_label_group}>
                        <label htmlFor="inputPassword">{lang[config.lang].login_section_password_input}</label>
                        <input type="password" id="inputPassword" ref={this.inputPassword} className="form-control" placeholder={lang[config.lang].login_section_password_placeholder} required text={this.state.password} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>

                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleOnClickLogin} disabled={!this.state.btn_enabled} title={this.state.btn_enabled?"":lang[config.lang].login_section_btn_login_disabled_title}>{lang[config.lang].login_section_btn_login}</button>
                    <button className="btn btn-lg btn-secondary btn-block" type="submit" onClick={this.handleOnClickSignup}>{lang[config.lang].login_section_btn_signup}</button>
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