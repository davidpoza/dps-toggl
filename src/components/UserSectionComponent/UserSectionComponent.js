import React, {Component} from 'react';
import PropTypes from 'prop-types';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './UserSectionComponent.scss';
import utils from '../../utils';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import UserListComponent from '../UserListComponent/UserListComponent';

class UserSectionComponent extends Component{
    constructor(props){
        super(props);
        this.projectNameInput = React.createRef();
        this.modal = React.createRef();
        this.state = {
            colorPicker:  null
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCreateProject = this.handleCreateProject.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    componentDidMount(){
        this.props.userActions.fetchUsers(this.props.user.token);

    }

    //ese flag de refresco lo modificamos cuando se ha creado un nuevo proyecto y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing){
            this.props.userActions.fetchUsers(this.props.user.token);
        }
    }

    //cada vez que se abre el modal de creacion de proyecot escoge un color aleatorio del array de colores del config
    handleOpenModal(){
        this.setState({
            colorPicker: config.project_colors[utils.random(0,config.project_colors.length)]
        });
        setTimeout(function (){
            this.projectNameInput.current.focus();
        }.bind(this), 500);

    }

    handleCreateProject(){
        this.props.projectActions.createProject(this.props.user.token, this.projectNameInput.current.value, this.state.colorPicker, this.props.user.id);
        $(this.modal.current).modal('hide');
        this.projectNameInput.current.value = "";
    }

    handleOnKeyPress(e){
        if(event.keyCode == 13)
            this.handleCreateProject();
    }

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between "+styles.header}>
                    <h1>{lang[config.lang].user_section_title}</h1>
                    <button className="btn-lg btn-primary" data-toggle="modal" data-target="#projectCreateModal" onClick={this.handleOpenModal}><i className="fas fa-plus-circle"></i></button>
                </div>
                <div className={"flex-grow-1 " + styles.projectlist}>
                    <UserListComponent
                    user={this.props.user}
                    users={this.props.users}
                    history={this.props.history}
                    userActions={this.props.userActions}
                    order={this.props.order}
                    sortBy={this.props.sortBy}
                    />
                </div>

                <div className="modal fade" id="projectCreateModal" ref={this.modal} tabIndex="-1" role="dialog" aria-labelledby="createProjectLabel" aria-hidden="true" onKeyPress={this.handleOnKeyPress}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createProjectLabel">{lang[config.lang].btn_new_project}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body "+styles.modal_body}>
                        <input className={styles.input} ref={this.projectNameInput} placeholder={lang[config.lang].project_name_placeholder}></input>
                        <div className="dropdown">
                            <button className={"btn dropdown-toggle "+styles.dropdown_btn} type="button" id="dropdownProjectColorButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className={"fas fa-square "+styles.color} style={{color: this.state.colorPicker}}></i>
                            </button>
                            <div className={"dropdown-menu "+styles.color_dropdown} aria-labelledby="dropdownProjectColorButton">
                                <div className="container">
                                    <div className="row justify-content-center">
                                    {
                                        config.project_colors.map((e,index)=>(
                                            <i key={"color"+index} className={"fas fa-square "+styles.color} style={{color: e}} onClick={this.handleColorPick}></i>
                                        ))
                                    }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleCreateProject}>{lang[config.lang].btn_save_changes}</button>
                    </div>
                    </div>
                </div>
                </div>
                <LoadingComponent isLoading={this.props.user_loading||this.props.project_loading} />
            </div>
        )
    }
}

UserSectionComponent.propTypes = {
    user:PropTypes.object.isRequired,
    user_loading: PropTypes.bool.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    userActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired
}


export default UserSectionComponent;