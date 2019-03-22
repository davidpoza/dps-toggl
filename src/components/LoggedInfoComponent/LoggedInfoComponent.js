import React, {Component} from 'react'
import {Link} from 'react-router-dom';

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

    refreshToken(){
        if(this.props.user.token != null){
            this.props.actions.refreshToken(this.props.user.token);
        }
    }

    componentDidMount(){
        if(this.state.setInterval == null)
            this.setState({
                setInterval: setInterval(this.refreshToken, 2*60*1000) //ponemos el refresco del token jwt a 4 minutos
            });       
    }

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

                    this.props.expanded ?

                    <img className={styles.avatar} src={this.props.user.avatar} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>   
                   :
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

export default LoggedInfoComponent;