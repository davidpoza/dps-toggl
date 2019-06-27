import React, {Component} from 'react';
import PropTypes from 'prop-types';

import config from '../../config/config';
import utils from '../../utils';
import styles from './UserComponent.scss';



class UserComponent extends Component{
    constructor(props){
        super(props);
    }


   handleOnClick(id){
        this.props.history.push("/projects/"+id);
   }

    render(){
        return(
            <li className={"row m-0 m-lg-1 justify-content-between " + styles.user } style={(this.props.user.active==true) ? {} : {opacity: 0.5}} onClick={this.handleOnClick.bind(this,this.props.user._id)}>
                <div className={"col-1 p-0"} >
                    <img className={styles.avatar} src={config.api_url+"/users/avatar/"+this.props.user.avatar}/>
                </div>
                { utils.isMobile() ?
                <div className={"col-11"} >
                    {this.props.user.email}
                </div>:
                <div className={"col-4"} >
                    {(this.props.user.admin==true) ? <i className="fas fa-star"></i> : "" }
                    {(this.props.user.admin==true) ? " "+this.props.user.email:this.props.user.email}
                </div>
                }
                { !utils.isMobile() &&
                <div className={"col-2"} >
                    {utils.standarDateToSpanish(this.props.user.created_on)}
                </div>
                }
                { !utils.isMobile() &&
                <div className={"col-2"} >
                    {this.props.user.first_name}
                </div>
                }
                { !utils.isMobile() &&
                <div className={"col-3"} >
                    {this.props.user.last_name}
                </div>
                }
            </li>
        )
    }
}

UserComponent.propTypes = {
    token: PropTypes.string.isRequired,

}


export default UserComponent;