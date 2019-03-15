import React, {Component} from 'react'
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
                        <p className="m-0">{this.props.username}</p>
                        <p className="m-0">Logout</p>
                     </div>
                     { this.props.expanded ? 
                        <img className={styles.avatar} src={avatar} href="#" />   
                       :
                        <img className={styles.avatar} src={avatar} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />                    
                     }
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Perfil</a>
                        <a class="dropdown-item" href="#">Logout</a>
                    </div>
                     
                     
            </div>
        )
    }
}

export default LoggedInfoComponent;