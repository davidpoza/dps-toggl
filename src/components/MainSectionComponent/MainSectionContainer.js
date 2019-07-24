import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import * as taskActions from "../../actions/taskActions";
import * as projectActions from "../../actions/projectActions";
import * as tagActions from "../../actions/tagActions";
import MainSectionComponent from "./MainSectionComponent";


class MainSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <MainSectionComponent
                user_error_message={this.props.user_error_message}
                task_error_message={this.props.task_error_message}
                project_error_message={this.props.project_error_message}
                tag_error_message={this.props.tag_error_message}
                userActions={this.props.userActions}
                taskActions={this.props.taskActions}
                projectActions={this.props.projectActions}
                tagActions={this.props.tagActions}/>
        );
    }
}

function mapStateToProps (state) {
    return {
        user_error_message: state.userReducer.error.message,
        task_error_message: state.taskReducer.error.message,
        project_error_message: state.projectReducer.error.message,
        tag_error_message: state.tagReducer.error.message
    };
}

function mapDispatchToProps (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch),
        tagActions: bindActionCreators(tagActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSectionContainer);
