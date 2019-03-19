import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import styles from './LoggedInfoComponent.scss';
import avatar from '../../images/avatar_sample.jpg'

class LoggedInfoComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={"d-flex justify-content-between " + styles.box}> 
                 <div className={styles.username}>
                    {this.props.user.token != null ? 
                        (   
                            <div>
                                <p className="m-0">{this.props.user.first_name} {this.props.user.last_name}</p>
                                <p className="m-0">Logout</p>
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

                    <img className={styles.avatar} src={this.props.user.avatar} href="#" />   
                   :
                    <img className={styles.avatar} src={this.props.user.avatar} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />                    
                 
                }
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Perfil</a>
                    <a className="dropdown-item" href="#">Logout</a>
                </div>
            </div>
        )
    }
}

export default LoggedInfoComponent;