import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import UserComponent from '../UserComponent/UserComponent';
import styles from './UserListComponent.scss';

class UserListComponent extends Component{
    constructor(props){
        super(props);


        this.state = {

        };
    }



    handleChangeSort(field){
        this.props.userActions.changeSort(field);
    }

    render(){
        return(
            <div className="d-flex flex-column">
            <div className={styles.header}>
                <div className={"container-flex " + styles.paddings}>
                    <div className={"row justify-content-between " } >
                        <div className={"col-1 p-0"} >

                        </div>
                        { !utils.isMobile() ?
                        <div className={"col-4"} onClick={this.handleChangeSort.bind(this,"email")}>
                            {lang[config.lang].th_user_email} <i className={this.props.sortBy!="email" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                        </div>:
                        <div className={"col-11"} onClick={this.handleChangeSort.bind(this,"email")}>
                            {lang[config.lang].th_user_email} <i className={this.props.sortBy!="email" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                        </div>
                        }
                        { !utils.isMobile() &&
                            <div className={"col-2"} onClick={this.handleChangeSort.bind(this,"created_on")}>
                                {lang[config.lang].th_user_created} <i className={this.props.sortBy!="created_on" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                            </div>
                        }
                        { !utils.isMobile() &&
                            <div className={"col-2"} onClick={this.handleChangeSort.bind(this,"first_name")}>
                                {lang[config.lang].th_user_first_name} <i className={this.props.sortBy!="first_name" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                            </div>
                        }
                        { !utils.isMobile() &&
                            <div className={"col-3"} onClick={this.handleChangeSort.bind(this,"last_name")}>
                                {lang[config.lang].th_user_last_name} <i className={this.props.sortBy!="last_name" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                            </div>
                        }
                    </div>
                </div>
               </div>
               <ul className={"p-0 container-flex "+styles.list }>
               {
                   this.props.users.map((e,index) => {
                        return <UserComponent token={this.props.user.token} key={index} user={e} history={this.props.history} />
                   })
               }
               </ul>
            </div>


        )
    }
}


UserListComponent.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array,
    history: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired
}

export default UserListComponent;