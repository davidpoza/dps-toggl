import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './LoggedInfoComponent.scss';
import avatar from '../../images/avatar_sample.jpg'

class LoggedInfoComponent extends Component{
    constructor(props){
        super(props);
        this.refreshToken = this.refreshToken.bind(this);

        this.state = {
            setInterval: null
        }
    }

    /**llama al thunk de redux que hace una petición al api para refrescar el token jwt */
    refreshToken(){
        if(this.props.user.token != null){
            this.props.actions.refreshToken(this.props.user.token);
        }
    }

    componentDidMount(){
        //antes de nada, hay que hacer un refreshtoken, para no perder la sesión anterior si es posible
        this.refreshToken();
        if(this.state.setInterval == null)
            this.setState({
                setInterval: setInterval(this.refreshToken, 4*60*1000) //ponemos el refresco del token jwt a 4 minutos
            });       
    }

    /**Limpiamos los setInterval para que no se acumulen durante la navegación entre routes */
    componentWillUnmount(){
        if(this.state.setInterval != null)
            clearInterval(this.state.setInterval)
    }

    render(){
        return(
            <div className={"d-flex justify-content-between " + styles.box}> 
                 <div>
                    {this.props.user.token != null ? 
                        (   
                            <div className={styles.username}>
                                <p className="m-0">{this.props.user.first_name} {this.props.user.last_name}</p>
                                <p className="m-0"><span className={styles.link} onClick={this.props.actions.logoutUser}>Logout</span></p>
                            </div>
                        ):
                        (
                            <div>                                
                                <p className="m-0"><Link to="/login">Login</Link></p>
                            </div>

                        )
                    }
                 </div>
                { this.props.user.token == null ?
                    (<div></div>):

                    <img className={styles.avatar} src={this.props.user.avatar} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />                    
                 
                }
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Perfil</a>
                    <a className="dropdown-item" onClick={this.props.actions.logoutUser}>Logout</a>
                </div>
            </div>
        )
    }
}

LoggedInfoComponent.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default LoggedInfoComponent;