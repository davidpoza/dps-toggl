import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './LoginComponent.scss';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


class LoginComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        this.state = {
            email: "",
            password: "",
            btn_enabled: false,
        };        
    }

    handleOnClick(){
        this.props.actions.loginUser(this.state.email, this.state.password, this.props.history);
        
    }

    
    componentDidMount(){
        this.setState({
            email: document.getElementById("inputEmail"),
            password: document.getElementById("inputPassword")
        });
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
        if(this.state.email == "" && this.state.password == "")
            this.setState({
                btn_enabled: false
            });
        else if(this.state.email != "" && this.state.password != "")
            this.setState({
                btn_enabled: true
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
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus text={this.state.email} onChange={this.handleOnChange}/>
                        
                    </div>

                    <div className={styles.form_label_group}>
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required text={this.state.password} onChange={this.handleOnChange}/>
                        
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleOnClick} disabled={!this.state.btn_enabled}>Login</button>
                </form>

            )
    }
}

export default LoginComponent;