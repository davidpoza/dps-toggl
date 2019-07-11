import React, {Component} from 'react';
import PropTypes from 'prop-types';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProfileSectionComponent.scss';
import utils from '../../utils';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


class ProfileSectionComponent extends Component{
    constructor(props){
        super(props);
        this.userEmailInput = React.createRef();
        this.userFirstNameInput = React.createRef();
        this.userLastNameInput = React.createRef();
        this.userAvatarInput = React.createRef();
        this.modal = React.createRef();
        this.state = {
            email: this.props.profile.email,
            first_name: this.props.profile.first_name,
            last_name: this.props.profile.last_name,
            admin: this.props.profile.admin,
            active: this.props.profile.active,
            avatar: this.props.profile.avatar
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSaveUser = this.handleSaveUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.toggleAdminLevel = this.toggleAdminLevel.bind(this);
    }

    componentDidMount(){
        this.props.userActions.fetchUserById(this.props.user.token, this.props.profile._id);
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing)
            this.props.userActions.fetchUserById(this.props.user.token, this.props.profile._id);

            //para cargar los datos de nuestro perfil cuando venimos de la vista perfil de otro usuario
        else if(prevProps.profile._id != this.props.profile._id){
            this.setState({
                email: this.props.profile.email,
                first_name: this.props.profile.first_name,
                last_name: this.props.profile.last_name,
                admin: this.props.profile.admin,
                active: this.props.profile.active,
                avatar: this.props.profile.avatar,
            });
        }
    }

    handleDeleteUser(){
        this.props.userActions.deleteUser(this.props.user.token, this.props.profile._id);
        $(this.modal.current).modal('hide');
        this.props.history.push("/users");
    }

    handleSaveUser(){
        let update = {};
        update["first_name"] = this.state.first_name;
        update["last_name"] = this.state.last_name;
        update["active"] = this.state.active;
        update["admin"] = this.state.admin;
        if(this.userAvatarInput.current.files.length == 1)
            update["avatar"] = this.userAvatarInput.current.files[0];

        this.props.userActions.updateUser(this.props.user.token, this.props.profile._id, update);
        if(this.props.profile._id == this.props.user.id) //si estamos salvando nuestro propio perfil
            this.props.history.push("/");
        else
            this.props.history.push("/users");
    }

    handleOnChange(e){
        if(e.target.id=="inputFirstName")
            this.setState({
                first_name: e.target.value
            });
        else if(e.target.id=="inputLastName")
            this.setState({
                last_name: e.target.value
            });
    }

    toggleStatus(){
        if(this.state.active)
            this.setState({active:false});
        else
            this.setState({active:true});
    }

    toggleAdminLevel(){
        if(this.state.admin)
            this.setState({admin:false});
        else
            this.setState({admin:true});
    }

    render(){
            return(
                <div className={"d-flex flex-column justify-content-start h-100"}>
                    <div className={"d-flex justify-content-between "+styles.header}>
                        <h1>{lang[config.lang].profile_section_title}</h1>
                        <div>
                            {
                                this.props.profile._id != this.props.user.id &&
                                <button className="btn btn-danger p-3 mr-2" data-toggle="modal" data-target="#deleteModal" title={lang[config.lang].btn_title_delete_user}><i className="fas fa-trash"></i></button>
                            }
                            <button className="btn btn-primary p-3" onClick={this.handleSaveUser}><i className="fas fa-save" title={lang[config.lang].btn_title_save_user}></i></button>
                        </div>
                    </div>
                    <div className={"flex-grow-1 " + styles.profile}>
                        <h2 className="my-2 mx-2 ml-md-5 ml-lg-5">{lang[config.lang].user_personal_data_h2}</h2>
                        <div className={ "d-flex flex-column flex-md-row justify-content-md-between my-2 mx-2 ml-md-5 ml-lg-5" }>
                            <div className={"order-1 order-lg-0 "+styles.inputs}>
                                <div className={styles.form_label_group}>
                                    <label htmlFor="inputEmail">{lang[config.lang].user_email_input}</label>
                                    <input id="inputEmail" className={styles.input} type="text" ref={this.userEmailInput} value={this.state.email} disabled />
                                </div>
                                <div className={styles.form_label_group}>
                                    <label htmlFor="inputFirstName">{lang[config.lang].user_first_name_input}</label>
                                    <input id="inputFirstName" className={styles.input} type="text" ref={this.userFirstNameInput} placeholder={lang[config.lang].user_first_name_placeholder} value={this.state.first_name} onChange={this.handleOnChange} />
                                </div>
                                <div className={styles.form_label_group}>
                                    <label htmlFor="inputLastName">{lang[config.lang].user_last_name_input}</label>
                                    <input id="inputLastName" className={styles.input} type="text" ref={this.userLastNameInput} placeholder={lang[config.lang].user_last_name_placeholder} value={this.state.last_name} onChange={this.handleOnChange} />
                                </div>
                                <div className={styles.form_label_group}>
                                    <label htmlFor="inputAvatar">{lang[config.lang].user_avatar_input}</label>
                                    <input id="inputAvatar" className={styles.input} type="file" ref={this.userAvatarInput} onChange={this.handleOnChange} />
                                </div>
                            </div>
                            <img className={"align-self-center align-self-lg-start order-0 order-md-1 order-lg-1 my-2 my-md-0 my-lg-0 mx-2 mx-md-5 mx-lg-5 "+styles.avatar} src={config.api_url+"/users/avatar/"+this.state.avatar} />
                        </div>

                        <div className="my-2 my-lg-5 mx-2 mx-md-5 mx-lg-5 ">
                            <h2>{lang[config.lang].user_account_data_h2}</h2>
                            <ul className="p-0">
                            <li className={styles.li}><strong>{lang[config.lang].user_creation}</strong>: {utils.standarDateToHumanExtended(this.props.profile.created_on)}</li>
                            <li className={styles.li}><strong>{lang[config.lang].user_update}</strong>: {this.props.profile.updated_on ? utils.standarDateToHumanExtended(this.props.profile.updated_on): lang[config.lang].not_available}</li>
                            {
                                this.props.user.admin == true &&
                                <div>
                                    <li className={styles.li}><strong>{lang[config.lang].user_activate_checkbox}</strong>: <span onClick={this.toggleStatus}>{this.state.active ? <i className="far fa-check-square"></i>:<i className="far fa-square"></i>}</span></li>
                                    <li className={styles.li}><strong>{lang[config.lang].user_admin_level}</strong>: <span onClick={this.toggleAdminLevel}>{this.state.admin ? <i className="far fa-check-square"></i>:<i className="far fa-square"></i>}</span></li>
                                </div>
                            }
                            </ul>
                        </div>



                    </div>

                    <div className="modal fade" id="deleteModal" ref={this.modal} tabIndex="-1" role="dialog" aria-labelledby="deleteUserLabel" aria-hidden="true" onKeyPress={this.handleOnKeyPress}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-body">
                            <h5 className="modal-title" id="deleteUserLabel">{lang[config.lang].title_delete_user_modal}</h5>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">{lang[config.lang].btn_cancel}</button>
                            <button type="button" className="btn btn-danger" onClick={this.handleDeleteUser}>{lang[config.lang].btn_confirm_delete}</button>
                        </div>
                        </div>
                    </div>
                    </div>


                    <LoadingComponent isLoading={this.props.user_loading} />
                </div>
            )
    }
}

ProfileSectionComponent.propTypes = {
    user:PropTypes.object.isRequired,
    user_loading: PropTypes.bool.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
}

export default ProfileSectionComponent;