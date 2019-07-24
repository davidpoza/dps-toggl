import React, {Component} from "react";
import PropTypes from "prop-types";

import config from "../../config/config";
import lang from "../../config/lang";
import styles from "./UserSectionComponent.scss";
import utils from "../../utils";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import UserListComponent from "../UserListComponent/UserListComponent";

class UserSectionComponent extends Component{
    constructor(props){
        super(props);
        this.projectNameInput = React.createRef();
        this.modal = React.createRef();
        this.state = {
            colorPicker:  null
        };
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
        $(this.modal.current).modal("hide");
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


                <LoadingComponent isLoading={this.props.user_loading||this.props.project_loading} />
            </div>
        );
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
};


export default UserSectionComponent;