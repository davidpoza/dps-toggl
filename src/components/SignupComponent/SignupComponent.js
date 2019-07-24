import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

import config from "../../config/config";
import lang from "../../config/lang";
import styles from "./SignupComponent.scss";
import logo from "../../images/logo_small.png";
import utils from "../../utils";
import LoadingComponent from "../LoadingComponent/LoadingComponent";


class SignupComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.inputEmail = React.createRef();
        this.inputPassword = React.createRef();
        this.inputRepeatPassword = React.createRef();

        this.state = {
            email: "",
            password: "",
            repeat_password: "",
            first_name: "",
            last_name: "",
            btn_enabled: false,
        };
    }

    handleOnClick(e){
        e.preventDefault();
        this.props.userActions.registerUser(this.state.email, this.state.password, this.props.history);

    }


    handleOnChange(e){
        if(e.target.id == "inputEmail")
            this.setState({
                email: e.target.value,
                btn_enabled: !utils.validEmail(e.target.value) || e.target.value == "" || this.state.password == "" || this.state.repeat_password == "" || (this.state.password != this.state.repeat_password) ? false:true
            });
        else if(e.target.id == "inputPassword")
            this.setState({
                password: e.target.value,
                btn_enabled: !utils.validEmail(this.state.email) || this.state.email == "" || e.target.value == "" || this.state.repeat_password == "" || (e.target.value != this.state.repeat_password) ? false:true
            });
        else if(e.target.id == "inputRepeatPassword")
            this.setState({
                repeat_password: e.target.value,
                btn_enabled: !utils.validEmail(this.state.email) || this.state.email == "" || this.state.password == "" || e.target.value == "" || (this.state.password != e.target.value) ? false:true
            });
    }

    render(){
        if(this.props.user.token != null) //autenticado
            return(<Redirect to="/" />);
        else
            return(
                <form autoComplete="off" className={styles.form_signin}>
                    <img src={logo} />
                    <h1>{lang[config.lang].signup_section_h1}</h1>
                    <h2>{lang[config.lang].signup_section_h2}</h2>
                    <LoadingComponent isLoading={this.props.user.loading} />

                    <div className={styles.form_label_group}>
                        <label htmlFor="inputEmail">{lang[config.lang].signup_section_email_input}</label>
                        <input type="email" id="inputEmail" ref={this.inputEmail} className={ (!utils.validEmail(this.state.email) && this.state.email!="") ? "form-control "+styles.invalid_form_control : "form-control"} placeholder={lang[config.lang].signup_section_email_placeholder} required autoFocus text={this.state.email} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>

                    </div>

                    <div className={styles.form_label_group}>
                        <label htmlFor="inputPassword">{lang[config.lang].signup_section_password_input}</label>
                        <input type="password" id="inputPassword" ref={this.inputPassword} className="form-control" placeholder={lang[config.lang].signup_section_password_placeholder} required text={this.state.password} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>
                        <input type="password" id="inputRepeatPassword" ref={this.inputRepeatPassword} className={this.state.password != this.state.repeat_password ? "form-control "+styles.invalid_form_control : "form-control"} placeholder={lang[config.lang].signup_section_repeat_password_placeholder} required text={this.state.repeat_password} onBlur={this.handleOnChange} onChange={this.handleOnChange}/>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleOnClick} disabled={!this.state.btn_enabled} title={this.state.btn_enabled?"":lang[config.lang].signup_section_btn_signup_disabled_title}>{lang[config.lang].signup_section_btn_signup}</button>
                    <p className={styles.p_login_link}>{lang[config.lang].signup_section_i_already_have_an_account} <NavLink exact={true} to="/login">{lang[config.lang].signup_section_here}</NavLink></p>
                </form>

            );
    }
}

SignupComponent.propTypes = {
    history: PropTypes.object.isRequired, //lo vamos a pasar al thunk de redux loginAction para redirigir después del login
    user: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
};


export default SignupComponent;